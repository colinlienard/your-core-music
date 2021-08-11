import { FC, useContext, useState } from "react";
import { LangContext } from "../../lib/contexts/LangContext";
import styles from "./TopSection.module.scss";

interface Props {
    name: string,
    timeLimit: string,
    setTimeLimit: (timeLimit: string) => void
}

const TopSection: FC<Props> = ({ name, timeLimit, setTimeLimit }) => {
    const { Stats: lang } = useContext(LangContext);

    const timeLimitIndex = {
        1: "short_term",
        2: "medium_term",
        3: "long_term"
    }

    return (
        <section className={styles.topSection}>
            <div className={styles.content}>
                <h1 className={styles.title}>{lang.hero[0] + name + lang.hero[1]}<br/>{lang.hero[2]}</h1>
                <ul className={styles.buttonsContainer}>
                    <li>
                        <button
                            className={`${styles.button} ${timeLimit === timeLimitIndex[1] ? null : styles.unselected}`}
                            onClick={() => setTimeLimit(timeLimitIndex[1])}>
                            {lang.lastMonth}
                        </button>
                    </li>
                    <li>
                        <button
                            className={`${styles.button} ${timeLimit === timeLimitIndex[2] ? null : styles.unselected}`}
                            onClick={() => setTimeLimit(timeLimitIndex[2])}>
                            {lang.last6Months}
                        </button>
                    </li>
                    <li>
                        <button
                            className={`${styles.button} ${timeLimit === timeLimitIndex[3] ? null : styles.unselected}`}
                            onClick={() => setTimeLimit(timeLimitIndex[3])}>
                            {lang.allTime}
                        </button>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default TopSection;