import { FC, useContext } from "react";
import Link from "next/link";
import { LangContext } from "../../lib/contexts/LangContext";
import styles from "./Footer.module.scss";
import ImageBox from "../ImageBox/ImageBox";

interface Props {
    logged?: boolean,
    loginUrl?: string
}

const Footer: FC<Props> = ({ logged, loginUrl }) => {
    const { Footer: lang } = useContext(LangContext);

    return (
        <footer className={styles.Footer}>
            <ImageBox className={styles.logo} src="/images/svg/logo.svg" alt="Your Core Music Logo" width={64} height={64}/>
            <h2 className={styles.title}><strong>Your Core Music</strong></h2>
            <p className={styles.subtitle}><strong>{lang.description}</strong></p>
            <div className={styles.sectionContainer}>
                <section className={styles.section}>
                    <h3 className={styles.title}>{lang.infos.title}</h3>
                    <ul className={styles.linksList}>
                        <li>
                            <a href="mailto:colin.lienard87@orange.fr" target="_blank" rel="noreferrer">{lang.infos.mail}</a>
                        </li>
                        <li>
                            <a href="https://github.com/ColinLienard/spotify-stats" target="_blank" rel="noreferrer">{lang.infos.github}</a>
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