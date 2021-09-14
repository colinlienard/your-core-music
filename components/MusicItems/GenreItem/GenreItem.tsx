import { FC, memo, useRef } from "react";
import useAnimOnScroll from "../../../lib/hooks/useAnimOnScroll";
import useRankGetter from "../../../lib/hooks/useRankGetter";
import { RankList } from "../../../lib/types";
import RankArrow from "../../RankArrow/RankArrow";
import styles from "./GenreItem.module.scss";

interface Props {
    name: string,
    rank: number | any,
    oldRanks: RankList | null
}

const GenreItem: FC<Props> = ({ name, rank, oldRanks }) => {
    const oldRank = useRankGetter(name, oldRanks);
    const ref = useRef(null);
    const visible = useAnimOnScroll(ref);

    return (
        <li className={styles.GenreItem} ref={ref}>
            <div className={`${styles.positionContainer} ${visible ? null : styles.hidden}`}>
                <p className={styles.rank}>{`# ${rank}`}</p>
                <RankArrow evolution={oldRank ? oldRank - rank : null}/>
            </div>
            <p className={`${styles.text} ${visible ? null : styles.hidden}`}>{name}</p>
        </li>
    )
}

export default memo(GenreItem);
