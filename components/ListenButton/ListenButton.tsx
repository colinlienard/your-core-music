import { FC } from "react";
import styles from "./ListenButton.module.scss";

interface Props {
    url: string,
    text: string
}

const ListenButton: FC<Props> = ({ url, text }) => {
    return (
        <a className={styles.ListenButton} href={url} target="_blank" rel="noreferrer">
            <svg width="19" height="20" viewBox="0 0 19 20">
                <path d="M1.07272 0.278809L18.012 9.98115L0.992889 19.7292L1.07272 0.278809ZM3.05861 3.72111L3.0071 16.2707L13.988 9.98115L3.05861 3.72111Z"/>
            </svg>
            <p>{text}</p>
        </a>
    )
}

export default ListenButton;