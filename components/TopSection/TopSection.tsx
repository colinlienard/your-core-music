import { FC, useContext, useState } from "react";
import { LangContext } from "../../lib/contexts/LangContext";
import styles from "./TopSection.module.scss";

interface Props {
    name: string
}

const TopSection: FC<Props> = ({ name }) => {
    const [timeLimit, setTimeLimit] = useState(1);
    const { Stats: lang } = useContext(LangContext);

    return (
        <section className={styles.topSection}>
            <div className={styles.content}>
                <h1 className={styles.title}>{lang.hero[0] + name + lang.hero[1]}<br/>{lang.hero[2]}</h1>
                <ul className={styles.buttonsContainer}>
                    <li>
                        <button
                            className={`${styles.button} ${timeLimit === 1 ? null : styles.unselected}`}
                            onClick={() => setTimeLimit(1)}>
                            {lang.lastMonth}
                        </button>
                    </li>
                    <li>
                        <button
                            className={`${styles.button} ${timeLimit === 2 ? null : styles.unselected}`}
                            onClick={() => setTimeLimit(2)}>
                            {lang.last6Months}
                        </button>
                    </li>
                    <li>
                        <button
                            className={`${styles.button} ${timeLimit === 3 ? null : styles.unselected}`}
                            onClick={() => setTimeLimit(3)}>
                            {lang.allTime}
                        </button>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default TopSection;