import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { FC, useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import MusicController from "../components/MusicController/MusicController";
import TopSection from "../components/TopSection/TopSection";
import ArtistsSection from "../components/MusicSections/ArtistsSection";
import TracksSection from "../components/MusicSections/TracksSection";
import GenresSection from "../components/MusicSections/GenresSection";
import MusicListProvider from "../lib/contexts/MusicListContext";
import { userData, ArtistList, TrackList, RankList, TrackContent, Recommendations, allRecommendations } from "../lib/types";
import ScrollUpButton from "../components/Buttons/ScrollUpButton/ScrollUpButton";
import RecommendationsSection from "../components/MusicSections/RecommendationsSection";
import Footer from "../components/Footer/Footer";
import { LangContext } from "../lib/contexts/LangContext";

interface RankListTimeLimit {
    short_term: RankList,
    medium_term: RankList,
    long_term: RankList,
}

interface Props {
    accessToken: string,
    user: userData,
    artists: ArtistList,
    tracks: TrackList,
    artistsRanks: RankListTimeLimit,
    tracksRanks: RankListTimeLimit,
    genresRanks: RankListTimeLimit,
    allRecommendations: allRecommendations
}

const Stats: FC<Props> = ({ accessToken, user, artists, tracks, artistsRanks, tracksRanks, genresRanks, allRecommendations }) => {
    const [timeLimit, setTimeLimit] = useState<"short_term" | "medium_term" | "long_term">("short_term");
    const [musicAllowed, setMusicAllowed] = useState(true);
    const router = useRouter();
    const { Stats: lang } = useContext(LangContext);

    useEffect(() => {
        router.replace("/stats", undefined, { shallow: true });
    }, [])

    const getData = async (url: string): Promise<ArtistList | TrackList> => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            
            return await response.json();
        } catch(error) {
            console.error(error);
            return { items: [] }
        }
    }

    return (<>
        <Head>
            <title>Spotify Hindsight | {user.display_name}</title>
            <meta name="description" content={lang.metaDesc}/>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="canonical" href="https://www.spotify-hindsight.io"/>
        </Head>
        <NavBar logged userData={user}/>
        {musicAllowed ?
            <MusicController tracks={tracks.items}/>
            :
            null
        }
        <TopSection name={user.display_name} timeLimit={timeLimit} setTimeLimit={setTimeLimit}/>
        <main>
            <MusicListProvider artists={artists.items} tracks={tracks.items}>
                <ArtistsSection timeLimit={timeLimit} getData={getData} artistsRanks={artistsRanks ? artistsRanks[timeLimit] : null}/>
                <TracksSection timeLimit={timeLimit} getData={getData} tracksRanks={tracksRanks ? tracksRanks[timeLimit] : null}/>
                <GenresSection timeLimit={timeLimit} genresRanks={genresRanks ? genresRanks[timeLimit] : null}/>
            </MusicListProvider>
            <RecommendationsSection data={allRecommendations}/>
        </main>
        <ScrollUpButton/>
        <Footer/>
    </>)
}

export const getServerSideProps: GetServerSideProps = async ctx => {

    const getTokens = async (url: string) => {
        try {
            const response = await fetch(url);
            if(response.ok) {
                const json = await response.json();
                
                const date = new Date();
                date.setTime(date.getTime() + json.expires_in * 1000);
                
                ctx.res.setHeader("Set-Cookie", [
                    `accessToken=${json.access_token}; path=/; expires=${date.toUTCString()};`,
                    json.refresh_token ? `refreshToken=${json.refresh_token}; path=/; expires=Tue, 19 Jan 2038 04:14:07 GMT` : ""
                ]);
                ctx.res.statusCode = 200;

                return getAllData(json.access_token);
            } else {
                return {
                    props: {}
                }
            }
        } catch(error) {
            console.error(error);

            return {
                props: {}
            }
        }
    }

    const getData = async (url: string, accessToken: string) => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            if(response.ok)
                return await response.json();
        } catch(error) {
            console.error(error);
        }
    }

    const getAllData = async (accessToken: string) => {
        const user = await getData("https://api.spotify.com/v1/me", accessToken);
        const artists = await getData("https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10", accessToken);
        const tracks = await getData("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10", accessToken);
        const artistsRanks = {
            short_term: ctx.req.cookies.artistsRanks_short_term ? JSON.parse(ctx.req.cookies.artistsRanks_short_term) : null,
            medium_term: ctx.req.cookies.artistsRanks_medium_term ? JSON.parse(ctx.req.cookies.artistsRanks_medium_term) : null,
            long_term: ctx.req.cookies.artistsRanks_long_term ? JSON.parse(ctx.req.cookies.artistsRanks_long_term) : null
        }
        const tracksRanks = {
            short_term: ctx.req.cookies.tracksRanks_short_term ? JSON.parse(ctx.req.cookies.tracksRanks_short_term) : null,
            medium_term: ctx.req.cookies.tracksRanks_medium_term ? JSON.parse(ctx.req.cookies.tracksRanks_medium_term) : null,
            long_term: ctx.req.cookies.tracksRanks_long_term ? JSON.parse(ctx.req.cookies.tracksRanks_long_term) : null
        }
        const genresRanks = {
            short_term: ctx.req.cookies.genresRanks_short_term ? JSON.parse(ctx.req.cookies.genresRanks_short_term) : null,
            medium_term: ctx.req.cookies.genresRanks_medium_term ? JSON.parse(ctx.req.cookies.genresRanks_medium_term) : null,
            long_term: ctx.req.cookies.genresRanks_long_term ? JSON.parse(ctx.req.cookies.genresRanks_long_term) : null
        }
        const allRecommendations = {
            calm: await getData("https://api.spotify.com/v1/recommendations?seed_artists=1Xyo4u8uXC1ZmMpatF05PJ,0HdLXCWPtmK9wgd7CyNuj3,0zhMujl1yB8pkB023Qm4Y2,6PuoYFHWSuzbr45sVWZDuS,09mEdoA6zrmBPgTEN5qXmN&target_energy=0&limit=10", accessToken),
            energetic: await getData("https://api.spotify.com/v1/recommendations?seed_artists=1Xyo4u8uXC1ZmMpatF05PJ,0HdLXCWPtmK9wgd7CyNuj3,0zhMujl1yB8pkB023Qm4Y2,6PuoYFHWSuzbr45sVWZDuS,09mEdoA6zrmBPgTEN5qXmN&target_energy=1&limit=10", accessToken),
            dancing: await getData("https://api.spotify.com/v1/recommendations?seed_artists=1Xyo4u8uXC1ZmMpatF05PJ,0HdLXCWPtmK9wgd7CyNuj3,0zhMujl1yB8pkB023Qm4Y2,6PuoYFHWSuzbr45sVWZDuS,09mEdoA6zrmBPgTEN5qXmN&target_danceability=1&limit=10", accessToken)
        }

        return {
            props: {
                accessToken,
                user,
                artists,
                tracks,
                artistsRanks,
                tracksRanks,
                genresRanks,
                allRecommendations
            }
        }
    }

    if(ctx.query.code) {
        return getTokens(`${process.env.NEXT_PUBLIC_URL}/api/login?code=${ctx.query.code}&lang=${ctx.locale}`);
    } else if(ctx.req.cookies.accessToken) {
        return getAllData(ctx.req.cookies.accessToken);
    } else if(ctx.req.cookies.refreshToken) {
        return getTokens(`${process.env.NEXT_PUBLIC_URL}/api/login?token=${ctx.req.cookies.refreshToken}`);
    }

    ctx.res.setHeader("Location", "/");
    ctx.res.statusCode = 302;
    ctx.res.end();

    return {
        props: {}
    }
}

export default Stats;
