import { FC, useContext } from "react";
import Link from "next/link";
import { LangContext } from "../../lib/contexts/LangContext";
import styles from "./Footer.module.scss";

interface Props {
    logged?: boolean,
    loginUrl?: string
}

const Footer: FC<Props> = ({ logged, loginUrl }) => {
    const { Footer: lang } = useContext(LangContext);

    return (
        <footer className={styles.Footer}>
            <h2 className={styles.title}>Spotify Hindsight</h2>
            <div className={styles.sectionContainer}>
                <section className={styles.section}>
                    <h3 className={styles.title}>{lang.infos.title}</h3>
                    <ul className={styles.linksList}>
                        <li>
                            <a href="mailto:colin.lienard87@orange.fr" target="_blank" rel="noreferrer">{lang.infos.mail[0]}</a>{lang.infos.mail[1]}
                        </li>
                        <li>
                            {lang.infos.github[0]}<a href="https://github.com/ColinLienard/spotify-stats" target="_blank" rel="noreferrer">{lang.infos.github[1]}</a>
                        </li>
                    </ul>
                </section>
                <section className={styles.section}>
                    <h3 className={styles.title}>{lang.links.title}</h3>
                    <ul className={styles.linksList}>
                        <li>
                            {logged ?
                                <Link href={"/api/logout"} locale={false}>
                                    <a>{lang.links.logout}</a>
                                </Link>
                                :                            
                                <a href={loginUrl}>{lang.links.login}</a>
                            }
                        </li>
                        <li>
                            <a href="https://www.spotify.com/" target="_blank" rel="noreferrer">{lang.links.spotify}</a>
                        </li>
                    </ul>
                </section>
            </div>
            <p className={styles.copyright}>{lang.copyright}</p>
        </footer>
    )
}

export default Footer;