import { FC, useEffect, useRef, useState } from "react";
import styles from "./HorizontalContainer.module.scss";

interface Props {
    className: string
}

const HorizontalContainer: FC<Props> = ({ children, className }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const element = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(window.innerWidth > 480) {
            element.current?.addEventListener("wheel", handlerWheel, { passive: false });
    
            return () => element.current?.removeEventListener("wheel", handlerWheel);
        }
    }, [])

    function handlerWheel(event: any) {
        setScrollPosition((scrollPosition) => {
            const newScrollPosition = scrollPosition - event.deltaY * 2;
            const width = element.current ? - element.current.children[0].getBoundingClientRect().width + window.innerWidth / 1.5 : 0;
            if(newScrollPosition >= 0) {
                return 0;
            } else if(newScrollPosition <= width) {
                return width;
            }
            event.preventDefault();
            return newScrollPosition;
        });
    }

    return (
        <div className={`${className} ${styles.HorizontalContainer}`} ref={element} >
            <ul style={{ transform: `translateX(${scrollPosition}px)` }}>
                {children}
            </ul>
        </div>
    )
}

export default HorizontalContainer;