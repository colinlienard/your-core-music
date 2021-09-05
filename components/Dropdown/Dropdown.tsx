import { useRouter } from "next/router";
import { FC, useState } from "react";
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

    const toggleMenu = () => setOpen(open => !open);

    return (
        <div className={styles.Dropdown}>
            <button className={styles.button} onClick={toggleMenu}>
                <ImageBox className={styles.flag} src={`/images/png/${router.locale}.png`} alt="" width={30} height={20}/>
            </button>
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