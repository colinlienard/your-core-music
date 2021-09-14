import { FC, useContext, useState } from "react";
import { LangContext } from "../../lib/contexts/LangContext";
import styles from "./TopSection.module.scss";

interface Props {
    name: string,
    timeLimit: string,
    setTimeLimit: (timeLimit: "short_term" | "medium_term" | "long_term") => void
}

const TopSection: FC<Props> = ({ name, timeLimit, setTimeLimit }) => {
    const { Stats: lang } = useContext(LangContext);

    return (
        <header className={styles.topSection}>
            <div className={styles.content}>
                <h1 className={styles.title}>{lang.hero[0] + name + lang.hero[1]}<br/>{lang.hero[2]}</h1>
                <ul className={styles.buttonsContainer}>
                    <li>
                        <button
                            className={`${styles.button} ${timeLimit === "short_term" ? null : styles.unselected}`}
                            onClick={() => setTimeLimit("short_term")}>
                            {lang.lastMonth}
                        </button>
                    </li>
                    <li>
                        <button
                            className={`${styles.button} ${timeLimit === "medium_term" ? null : styles.unselected}`}
                            onClick={() => setTimeLimit("medium_term")}>
                            {lang.last6Months}
                        </button>
                    </li>
                    <li>
                        <button
                            className={`${styles.button} ${timeLimit === "long_term" ? null : styles.unselected}`}
                            onClick={() => setTimeLimit("long_term")}>
                            {lang.allTime}
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default TopSection;