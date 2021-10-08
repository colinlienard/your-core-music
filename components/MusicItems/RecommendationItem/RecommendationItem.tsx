import { FC, memo, useContext } from "react";
import { LangContext } from "../../../lib/contexts/LangContext";
import splitArtists from "../../../lib/tools/splitArtists";
import ListenButton from "../../Buttons/ListenButton/ListenButton";
import ImageBox from "../../ImageBox/ImageBox";
import styles from "./RecommendationItem.module.scss";

interface Props {
    isTrack: boolean,
    name: string,
    artists: { name: string }[],
    image: string,
    url: string
}

const RecommendationItem: FC<Props> = ({ name, artists, image, url }) => {
    const { MusicItem: lang } = useContext(LangContext);

    return (
        <div className={styles.RecommendationItem}>
            <ImageBox className={styles.image} src={image} alt={`${lang.imageAlt} ${name}.`} width={320} height={320}/>
            {/* <a className={styles.imageContainer} href={url} aria-label="Listen this track." target="_blank" rel="noreferrer">
                <ImageBox className={styles.image} src={image} alt={`${lang.imageAlt} ${name}.`} width={320} height={320}/>
                <div className={styles.overImage}/>
                <svg className={styles.icon} width="19" height="20" viewBox="0 0 19 20" role="img" aria-label="Listen this track.">
                    <path d="M1.07272 0.278809L18.012 9.98115L0.992889 19.7292L1.07272 0.278809ZM3.05861 3.72111L3.0071 16.2707L13.988 9.98115L3.05861 3.72111Z"/>
                </svg>
            </a> */}
            <h3 className={styles.title}>{name}</h3>
            <p className={styles.subtitle}>{splitArtists(artists)}</p>
            <ListenButton text={lang.listen} url={url}/>
        </div>
    )
}

export default memo(RecommendationItem);