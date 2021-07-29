import { FC, useContext } from "react";
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
                    <img src={userData.images[0].url} alt=""/>
                    <div/>
                </div>
                : null
            }
            <div className={styles.informationsContainer}>
                <img className={styles.cross} src="images/cross.svg" alt="" onClick={toggle}/>
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
                <a className={styles.link + " " + styles.green} href={userData.external_urls.spotify} target="_blank">{lang.profile}</a>
                <a className={styles.link + " " + styles.red} href="/api/logout">{lang.logout}</a>
            </div>
        </div>
    )
}

export default Popup;