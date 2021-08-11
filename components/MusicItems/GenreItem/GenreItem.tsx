import { FC } from "react";
import styles from "./GenreItem.module.scss";

interface Props {
    name: string,
    position: number | any
}

const GenreItem: FC<Props> = ({ name, position }) => {
    return (
        <li className={styles.GenreItem}>
            <div className={styles.positionContainer}>
                <p>{`# ${position}`}</p>
                <svg width="18" height="17" viewBox="0 0 18 17">
                    <path d="M9.07108 16.2634L0.939347 8.1317L3.06067 6.01038L9.07108 12.0208L15.0815 6.01038L17.2028 8.1317L9.07108 16.2634Z"/>
                </svg>
            </div>
            <p className={styles.text}>{name}</p>
        </li>
    )
}

export default GenreItem;
