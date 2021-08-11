import { FC, useContext, useEffect, useState } from "react";
import { LangContext } from "../../lib/contexts/LangContext";
import styles from "./LoadingScreen.module.scss";

const LoadingScreen: FC = () => {
    const [visible, setVisible] = useState(false);
    const { Home: lang } = useContext(LangContext);

    useEffect(() => {
        setVisible(true);
    }, [])

    return (
        <div className={`${styles.LoadingScreen} ${visible ? styles.visible : ""}`}>
            <span className={styles.circle}/>
            <p className={styles.text}>{lang.loading}</p>
        </div>
    )
}

export default LoadingScreen;