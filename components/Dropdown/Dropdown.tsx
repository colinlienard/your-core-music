import { FC, useState } from "react";
import ImageBox from "../ImageBox/ImageBox";
import styles from "./Dropdown.module.scss";

type Option = {
    name: string,
    action: () => void
}

interface Props {
    name: string,
    options: Option[]
}

const Dropdown: FC<Props> = ({ name, options }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.Dropdown}>
            <button className={styles.button} onClick={() => setOpen(open => !open)}>
                <ImageBox className={styles.flag} src="/images/png/fr.png" alt="" width={30} height={20}/>
            </button>
            <ul className={`${styles.menu} ${open ? styles.open : null}`}>
                {options.map((option, index) => {
                    return <li className={styles.option} key={index} onClick={() => option.action()}>{option.name}</li>
                })}
            </ul>
        </div>
    )
}

export default Dropdown;