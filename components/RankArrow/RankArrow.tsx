import { FC, MouseEvent, useContext, useState } from "react";
import { LangContext } from "../../lib/contexts/LangContext";
import styles from "./RankArrow.module.scss";

interface Props {
    evolution: number | null
}

const RankArrow: FC<Props> = ({ evolution }) => {
    const { RankArrow: lang } = useContext(LangContext);
    const state = evolution !== null ? (evolution > 0 ? `+${evolution}` : evolution === 0 ? lang.same : evolution) : lang.new;
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

    const handlerMouseEvent = (event: MouseEvent<HTMLElement>) => {
        switch(event.type) {
            case "mouseenter":
                setPopupVisible(true);
                break;
            case "mouseleave":
                setPopupVisible(false);
                break;
            case "mousemove":
                setPopupPosition({
                    x: event.nativeEvent.offsetX,
                    y: event.nativeEvent.offsetY
                });
                break;
            default:
                break;
        }
    }

    return (
        <div className={styles.RankArrow} onMouseEnter={handlerMouseEvent} onMouseLeave={handlerMouseEvent} onMouseMove={handlerMouseEvent}>
            {evolution !== null ?
                evolution === 0 ?
                    <svg width="16" height="3" viewBox="0 0 16 3" role="img" aria-label={lang.same}>
                        <rect width="16" height="3"/>
                    </svg>
                    :
                    <svg width="17" height="11" viewBox="0 0 17 11" role="img" aria-label={evolution > 0 ? lang.up : lang.down}>
                        {evolution > 0 ?
                            <path d="M16.9393 8.85592L14.834 10.9393L8.93935 5.10614L3.0447 10.9393L0.939347 8.85592L8.93935 0.93933L16.9393 8.85592Z"/>
                            :
                            <path d="M0.939346 3.02274L3.0447 0.939331L8.93935 6.77252L14.834 0.939331L16.9393 3.02274L8.93935 10.9393L0.939346 3.02274Z"/>
                        }
                    </svg>
                :
                <svg width="14" height="14" viewBox="0 0 14 14" role="img" aria-label={lang.new}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12ZM7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z"/>
                </svg>
            }
            <div className={`${styles.popup} ${popupVisible ? styles.active : ""}`} style={{ top: popupPosition.y, left : popupPosition.x }}>
                <p className={evolution ? (evolution > 0 ? styles.up : evolution < 0 ? styles.down : "") : ""}>{state}</p>
            </div>
        </div>
    )
}

export default RankArrow;