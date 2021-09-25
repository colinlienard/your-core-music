import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";
import { LangContext } from "../../lib/contexts/LangContext";
import ImageBox from "../ImageBox/ImageBox";
import styles from "./Dropdown.module.scss";

type Option = {
    name: string,
    locale: string,
    action: () => void
}

interface Props {
    options: Option[]
}

const Dropdown: FC<Props> = ({ options }) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { Dropdown: lang } = useContext(LangContext);

    const toggleMenu = () => setOpen(open => !open);

    return (
        <div className={styles.Dropdown}>
            <div className={styles.button} onClick={toggleMenu}>
                <ImageBox className={styles.flag} src={`/images/png/${router.locale}.png`} alt={lang.imageAlt} width={30} height={20}/>
            </div>
            <ul className={`${styles.menu} ${open ? styles.open : null}`}>
                {options.map((option, index) => {
                    return (
                        <li className={`${styles.option} ${router.locale === option.locale ? styles.active : ""}`} key={index} onClick={
                            () => {
                                option.action();
                                toggleMenu();
                            }
                        }>{option.name}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Dropdown;