import { FC, useEffect, useState } from "react";
import styles from "./ScrollUpButton.module.scss";

interface Props {

}

const ScrollUpButton: FC<Props> = ({ }) => {
    const [visible, setVisible] = useState(false);

    const handleScroll = () => {
        if(window.scrollY > 500) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    })

    return (
        <button className={`${styles.ScrollUpButton} ${visible ? styles.visible : ""}`} onClick={() => window.scrollTo(0, 0)}>
            <svg width="17" height="21" viewBox="0 0 17 21" role="img" aria-label="Scroll up.">
                <path d="M9.99201 1.93293L8.93933 0.878662L7.88665 1.93293L0.939331 8.89072L3.04469 10.9993L7.45062 6.58668V20.8787H10.428V6.58668L14.834 10.9993L16.9393 8.89072L9.99201 1.93293Z"/>
            </svg>
        </button>
    )
}

export default ScrollUpButton;