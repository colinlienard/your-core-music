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
                    <ImageBox src={userData.images[0].url} alt=""/>
                    <div/>
                </div>
                : null
            }
            <div className={styles.informationsContainer}>
                <img className={styles.cross} src="images/svg/cross.svg" alt="" onClick={toggle}/>
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