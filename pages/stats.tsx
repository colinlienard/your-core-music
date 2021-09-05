import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { FC, useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import MusicController from "../components/MusicController/MusicController";
import TopSection from "../components/TopSection/TopSection";
import ArtistsSection from "../components/MusicSections/ArtistsSection";
import TracksSection from "../components/MusicSections/TracksSection";
import GenresSection from "../components/MusicSections/GenresSection";
import MusicListProvider from "../lib/contexts/MusicListContext";
import { userData, ArtistList, TrackList, RankList } from "../lib/types";

interface RankListTimeLimit {
    short_term: RankList,
    medium_term: RankList,
    long_term: RankList,
}

interface Props {
    user: userData,
    artists: ArtistList,
    tracks: TrackList,
    artistsRanks: RankListTimeLimit,
    tracksRanks: RankListTimeLimit
}

const Stats: FC<Props> = ({ user, artists, tracks, artistsRanks, tracksRanks }) => {
    const [accessToken, setAccessToken] = useState("");
    const [timeLimit, setTimeLimit] = useState<"short_term" | "medium_term" | "long_term">("short_term");
    const [musicAllowed, setMusicAllowed] = useState(false);
    const router = useRouter();

    useEffect(() => {
        router.replace("/stats", undefined, { shallow: true });

        const cookie: string | undefined = document.cookie;
        if(cookie) {
            setAccessToken(cookie
                .split("; ")
                .find((row) => row.startsWith("accessToken="))!
                .split("=")[1]
            );
        }
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
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar logged userData={user}/>
        <main role="main">
            {musicAllowed ?
                <MusicController tracks={tracks.items}/>
                :
                null
            }
            <TopSection name={user.display_name} timeLimit={timeLimit} setTimeLimit={setTimeLimit}/>
            <MusicListProvider artists={artists.items} tracks={tracks.items}>
                <ArtistsSection timeLimit={timeLimit} getData={getData} artistsRanks={artistsRanks ? artistsRanks[timeLimit] : null}/>
                <TracksSection timeLimit={timeLimit} getData={getData} tracksRanks={tracksRanks ? tracksRanks[timeLimit] : null}/>
                <GenresSection/>
            </MusicListProvider>
        </main>
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
                    `refreshToken=${json.refresh_token}; path=/;`
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

        return {
            props: {
                user,
                artists,
                tracks,
                artistsRanks,
                tracksRanks
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
