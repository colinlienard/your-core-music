import { FC, useContext } from "react";
import Link from "next/link";
import ImageBox from "../ImageBox/ImageBox";
import { LangContext } from "../../lib/contexts/LangContext";
import { userData } from "../../lib/types";
import styles from "./Popup.module.scss";

interface Props {
    userData: userData,
    open: boolean,
    toggle: () => void
}

const Popup: FC<Props> = ({ userData, open, toggle }) => {
    const { Popup: lang } = useContext(LangContext);

    return (
        <div className={`${styles.Popup} ${open ? styles.PopupOpen : ""}`}>
            {userData.images[0] ?
                <div className={styles.profilePicture}>
                    <ImageBox className={styles.image} src={userData.images[0].url} alt={lang.imageAlt} width={426} height={240}/>
                    <div className={styles.gradient}/>
                </div>
                : null
            }
            <div className={styles.informationsContainer}>
                {/* <img className={styles.cross} src="images/svg/cross.svg" alt="" onClick={toggle}/> */}
                <svg className={styles.cross} width="15" height="15" viewBox="0 0 15 15" role="img" aria-label={lang.svgAlt} onClick={toggle}>
                    <path d="M6.89941 8.89954L6.89941 14.8995H8.89941V8.89954H14.8994V6.89954L8.89941 6.89954V0.899536L6.89941 0.899536V6.89954H0.899414L0.899414 8.89954H6.89941Z"/>
                </svg>
                <div>
                    <p className={styles.label}>{lang.signedIn}</p>
                    <p className={styles.bigInformation}>{userData.display_name}</p>
                </div>
                <div>
                    <p className={styles.label}>{lang.email}</p>
                    <p className={styles.information}>{userData.email}</p>
                </div>
                <div>
                    <p className={styles.label}>{lang.account}</p>
                    <p className={styles.information}>{userData.product === "premium" ? "Premium" : "Free"}</p>
                </div>
            </div>
            <div className={styles.toolsContainer}>
                <a className={`${styles.link} ${styles.green}`} href={userData.external_urls.spotify} target="_blank" rel="noreferrer">{lang.profile}</a>
                <Link href={"/api/logout"} locale={false}>
                    <a className={`${styles.link} ${styles.red}`}>{lang.logout}</a>
                </Link>
            </div>
        </div>
    )
}

export default Popup;