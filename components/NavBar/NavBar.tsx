import { useRouter } from "next/router";
import { FC, useState, useContext, useEffect, memo } from "react";
import Popup from "../Popup/Popup";
import Dropdown from "../Dropdown/Dropdown";
import ImageBox from "../ImageBox/ImageBox";
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
    const [onMobile, setOnMobile] = useState(true);
    const router = useRouter();
    const { NavBar: lang } = useContext(LangContext);

    useEffect(() => setOnMobile(window.innerWidth > 480), []);

    const togglePopup = () => setPopupOpen(popupOpen => !popupOpen);

    const changeLang = (locale: string) => router.push(router.pathname, router.pathname, { locale });

    return (
        <nav className={styles.NavBar}>
            <div className={styles.content}>
                <p className={styles.appName}>Hindsight</p>
                <p className={styles.text}>{lang.description}</p>
                {onMobile ?
                    <ImageBox className={styles.logo} src="/images/png/spotify_logo.png" alt="" width={100} height={30}/>
                    :
                    <ImageBox className={styles.icon} src="/images/png/spotify_icon.png" alt="" width={30} height={30}/>
                }
                <div className={styles.contentRight}>
                    <Dropdown options={[
                        { name: "English", locale: "en", action: () => { if(router.locale !== "en") changeLang("en"); }},
                        { name: "Français", locale: "fr", action: () => { if(router.locale !== "fr") changeLang("fr"); }}
                    ]}/>
                    {logged ?
                        <>
                            <div className={`${styles.loginButton} ${styles.logged}`} onClick={togglePopup}>
                                <ImageBox className={(userData as userData).images[0] ? styles.userPP : styles.defaultPP} src={(userData as userData).images[0] ? (userData as userData).images[0].url : "images/svg/login.svg"} alt=""/>
                                <p>{(userData as userData).display_name}</p>
                            </div>
                            <Popup userData={userData as userData} open={popupOpen} toggle={togglePopup}/>
                        </>
                        :
                        <a className={styles.loginButton} href={loginUrl} onClick={startLoading}>
                            <ImageBox className={styles.defaultPP} src="/images/svg/login.svg" alt=""/>
                            <p>{lang.login}</p>
                        </a>
                    }
                </div>
            </div>
        </nav>
    )
}

export default memo(NavBar);