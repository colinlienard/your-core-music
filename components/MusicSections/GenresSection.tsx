import { FC, useContext } from "react";
import { LangContext } from "../../lib/contexts/LangContext";
import { MusicListContext } from "../../lib/contexts/MusicListContext";
import GenreItem from "../MusicItems/GenreItem/GenreItem";
import useGenres from "../../lib/hooks/useGenres";
import styles from "./MusicSection.module.scss";

const GenresSection: FC = () => {
    const { artistList } = useContext(MusicListContext);
    const genres = useGenres(artistList);
    const { Stats: lang } = useContext(LangContext);

    return (
        <section className={`${styles.genresSection} ${styles.musicSection}`}>
            <svg className={styles.wave} width="1600" height="300" viewBox="0 0 1600 300">
                <path d="M289.5 141.008C131.5 162.803 27.6667 264.115 0 300H1600V85.187C1507 40.8289 1354.7 -26.5375 1174 10.9244C998.5 47.3082 996 154.465 743.5 191.347C548.714 219.799 481 114.593 289.5 141.008Z"/>
            </svg>
            <div className={styles.background}/>
            <div className={styles.content}>
                <h2 className={styles.title}>{lang.genres}</h2>
            </div>
            <ul className={styles.genresContainer}>
                {genres.map((genre, index) => {
                    return <GenreItem key={index} name={genre} position={index + 1}/>
                })}
            </ul>
        </section>
    )
}

export default GenresSection;