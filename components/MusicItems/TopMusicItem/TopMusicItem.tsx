import { FC, memo, useContext, useEffect } from "react";
import ImageBox from "../../ImageBox/ImageBox";
import { LangContext } from "../../../lib/contexts/LangContext";
import styles from "./TopMusicItem.module.scss";
import { RankList } from "../../../lib/types";
import useRankGetter from "../../../lib/hooks/useRankGetter";

interface Props {
    url: string,
    image: string,
    name: string,
    rank: number,
    oldRanks: RankList | null,
    id: string,
    popularity?: number,
    artists?: string
}

const TopMusicItem: FC<Props> = ({ url, image, name, rank, oldRanks, id, popularity, artists }) => {
    const oldRank = useRankGetter(id, oldRanks);
    const { MusicItem: lang } = useContext(LangContext);

    useEffect(() => {
        
    }, [oldRanks])

    return (
        <div className={styles.TopMusicItem}>
            <ImageBox className={styles.image} src={image} alt=""/>
            <div className={styles.positionContainer}>
                <p>{`# ${rank}`}</p>
                {oldRank ? (oldRank - rank === 0 ? "same" : oldRank - rank > 0 ? `+${oldRank - rank}` : oldRank - rank) : "no data"}
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
                <p>{lang.listen}</p>
            </a>
        </div>
    )
}

export default memo(TopMusicItem);