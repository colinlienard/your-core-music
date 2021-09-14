import { FC } from "react";
import styles from "./ErrorMessage.module.scss";

interface Props {
    title: string,
    content: string,
    success: {
        message: string,
        action: () => void
    },
    fail: {
        message: string,
        action: () => void
    },
    visible: boolean
}

const ErrorMessage: FC<Props> = ({ title, content, success, fail, visible }) => {
    return (
        <div className={`${styles.ErrorMessage} ${!visible ? styles.hidden : null}`}>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.text}>{content}</p>
            </div>
            <div className={styles.buttonContainer}>
                <button  className={styles.success} onClick={success.action}>{success.message}</button>
                <button className={styles.fail} onClick={fail.action}>{fail.message}</button>
            </div>
        </div>
    )
}

export default ErrorMessage;