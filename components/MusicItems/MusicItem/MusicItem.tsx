import { FC, memo, useContext, useRef } from "react";
import ImageBox from "../../ImageBox/ImageBox";
import { RankList } from "../../../lib/types";
import useRankGetter from "../../../lib/hooks/useRankGetter";
import RankArrow from "../../RankArrow/RankArrow";
import useAnimOnScroll from "../../../lib/hooks/useAnimOnScroll";
import ListenButton from "../../ListenButton/ListenButton";
import { LangContext } from "../../../lib/contexts/LangContext";
import styles from "./MusicItem.module.scss";

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
    const ref = useRef(null);
    const visible = useAnimOnScroll(ref);
    const { MusicItem: lang } = useContext(LangContext);

    return (
        <div className={`${styles.MusicItem} ${visible ? null : styles.hidden}`} ref={ref}>
            <div className={styles.positionContainer}>
                <p className={styles.number}>{rank}</p>
                <RankArrow evolution={oldRank ? oldRank - rank : null}/>
            </div>
            <ImageBox className={styles.image} src={image} alt=""/>
            <div className={styles.titlesContainer}>
                <h3 className={styles.title}>{name}</h3>
            <p className={styles.subtitle}>{popularity ? `${popularity}% ${lang.mainstream}` : artists}</p>
            </div>
            <ListenButton text={lang.listen} url={url}/>
        </div>
    )
}

export default memo(TopMusicItem);