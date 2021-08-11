import { FC, useContext } from "react";
import { LangContext } from "../../../lib/contexts/LangContext";
import styles from "./TopMusicItem.module.scss";

interface Props {
    url: string,
    image: string,
    name: string,
    position: number,
    popularity?: number,
    artists?: string
}

const TopMusicItem: FC<Props> = ({ url, image, name, position, popularity, artists }) => {
    const { MusicItem: lang } = useContext(LangContext);

    return (
        <div className={styles.TopMusicItem}>
            <img className={styles.image} src={image} alt=""/>
            <div className={styles.positionContainer}>
                <p>{`# ${position}`}</p>
                <svg width="18" height="17" viewBox="0 0 18 17">
                    <path d="M9.07108 16.2634L0.939347 8.1317L3.06067 6.01038L9.07108 12.0208L15.0815 6.01038L17.2028 8.1317L9.07108 16.2634Z"/>
                </svg>
            </div>
            <h3 className={styles.title}>{name}</h3>
            <p className={styles.subtitle}>{popularity ? `${popularity}% ${lang.mainstream}` : artists}</p>
            <a className={styles.link} href={url} target="_blank" rel="noreferrer">
                <svg width="19" height="20" viewBox="0 0 19 20">
                    <path d="M1.07272 0.278809L18.012 9.98115L0.992889 19.7292L1.07272 0.278809ZM3.05861 3.72111L3.0071 16.2707L13.988 9.98115L3.05861 3.72111Z"/>
                </svg>
                <p>{lang.listen} <span>Spotify</span></p>
            </a>
        </div>
    )
}

export default TopMusicItem;