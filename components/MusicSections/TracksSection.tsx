import { FC, useContext } from "react";
import MusicItem from "../MusicItems/MusicItem/MusicItem";
import TopMusicItem from "../MusicItems/TopMusicItem/TopMusicItem";
import { LangContext } from "../../lib/contexts/LangContext";
import { TrackContent, ArtistContent, ArtistName } from "../../lib/types";
import styles from "./MusicSection.module.scss";

interface Props {
    tracks: { items: TrackContent[] }
}

const ArtistsSection: FC<Props> = ({ tracks }) => {
    const { Stats: lang } = useContext(LangContext);

    const splitArtists = (artists: ArtistName[]) => {
        if(artists.length === 1)
            return artists[0].name;
        
        let result = "";

        artists.forEach(artist => {
            if(result.length === 0)
                result = artist.name;
            else
                result = `${result}, ${artist.name}`;
        });

        return result;
    }

    return (
        <section className={`${styles.tracksSection} ${styles.musicSection}`}>
            <svg className={styles.wave} width="1600" height="300" viewBox="0 0 1600 300">
                <path d="M289.5 141.008C131.5 162.803 27.6667 264.115 0 300H1600V85.187C1507 40.8289 1354.7 -26.5375 1174 10.9244C998.5 47.3082 996 154.465 743.5 191.347C548.714 219.799 481 114.593 289.5 141.008Z"/>
            </svg>
            <div className={styles.background}/>
            <div className={styles.content}>
                <h2 className={styles.title}>{lang.tracks}</h2>
                <ul className={styles.topMusicContainer}>
                    {tracks.items.map((track, index) => {
                        if(index < 3) {
                            return (
                                <li key={index}>
                                    <TopMusicItem
                                        key={index}
                                        url={track.external_urls.spotify}
                                        image={track.album.images[0].url}
                                        name={track.name}
                                        position={index + 1}
                                        artists={splitArtists(track.artists)}
                                    />
                                    { index < 2 ? <hr className={styles.separator}/> : null }
                                </li>
                            )
                        }
                    })}
                </ul>
                <ul className={styles.musicContainer}>
                    {tracks.items.map((track, index) => {
                        if(index > 2) {
                            return (
                                <li key={index}>
                                    <MusicItem
                                        key={index}
                                        url={track.external_urls.spotify}
                                        image={track.album.images[2].url}
                                        name={track.name}
                                        position={index + 1}
                                        artists={splitArtists(track.artists)}
                                    />
                                    { index < tracks.items.length - 1 ? <hr className={styles.separator}/> : null }
                                </li>
                            )
                        }
                    })}
                </ul>
                <button className={styles.button}>
                    <svg width="15" height="15" viewBox="0 0 15 15">
                        <path d="M6.89941 8.89954L6.89941 14.8995H8.89941V8.89954H14.8994V6.89954L8.89941 6.89954V0.899536L6.89941 0.899536V6.89954H0.899414L0.899414 8.89954H6.89941Z"/>
                    </svg>
                    <p>{lang.more}</p>
                </button>
            </div>
        </section>
    )
}

export default ArtistsSection;