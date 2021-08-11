import { useRouter } from "next/router";
import { FC, useState, useContext } from "react";
import Popup from "../Popup/Popup";
import { LangContext } from "../../lib/contexts/LangContext";
import { userData } from "../../lib/types";
import styles from "./NavBar.module.scss";

interface Props {
    logged: boolean,
    loginUrl?: string,
    userData?: userData,
    startLoading?: () => void
}

const NavBar: FC<Props> = ({ logged, loginUrl, userData, startLoading }) => {
    const [popupOpen, setPopupOpen] = useState(false);
    const router = useRouter();
    const { NavBar: lang } = useContext(LangContext);

    const togglePopup = () => setPopupOpen(popupOpen => !popupOpen);

    const changeLang = () => router.push(router.pathname, router.pathname, { locale: lang.current === "FR" ? "en" : "fr" });

    return (
        <nav className={styles.NavBar}>
            <div className={styles.content}>
                <p className={styles.appName}>Statify</p>
                <p className={styles.text}>{lang.description}</p>
                <img className={styles.logo} src="images/png/spotify_logo.png" alt=""/>
                <div className={styles.contentRight}>
                    <button className={styles.language} onClick={changeLang} data-popup={lang.switch}>{lang.current}</button>
                    {logged ?
                        <>
                            <button className={`${styles.loginButton} ${styles.logged}`} onClick={togglePopup}>
                                <img className={(userData as userData).images[0] ? styles.userPP : styles.defaultPP} src={(userData as userData).images[0] ? (userData as userData).images[0].url : "images/svg/login.svg"} alt=""/>
                                <p>{(userData as userData).display_name}</p>
                            </button>
                            <Popup userData={userData as userData} open={popupOpen} toggle={togglePopup}/>
                        </>
                        :
                        <a className={styles.loginButton} href={loginUrl} onClick={startLoading}>
                            <img src="images/svg/login.svg" alt=""/>
                            <p>{lang.login}</p>
                        </a>
                    }
                </div>
            </div>
        </nav>
    )
}

export default NavBar;