import { FC, MouseEvent, useContext, useEffect, useRef, useState, WheelEvent, WheelEventHandler } from "react";
import { LangContext } from "../../lib/contexts/LangContext";
import { allRecommendations } from "../../lib/types";
import HorizontalContainer from "../HorizontalContainer/HorizontalContainer";
import RecommendationItem from "../MusicItems/RecommendationItem/RecommendationItem";
import styles from "./MusicSection.module.scss";

interface Props {
    data: allRecommendations
}

const RecommendationsSection: FC<Props> = ({ data }) => {
    // const [isDragging, setIsDragging] = useState(false);
    // const [scrollPosition, setScrollPosition] = useState({ mouse: 0, container: 0 });
    // const [scrollPosition, setScrollPosition] = useState(0);
    // const firstList = useRef<HTMLUListElement>(null);
    const { Stats: lang } = useContext(LangContext);

    // useEffect(() => {
    //     firstList.current?.addEventListener("wheel", handlerWheel, { passive: false });

    //     return () => {
    //         firstList.current?.removeEventListener("wheel", handlerWheel);
    //     }
    // }, [])

    // const handleMouseEvents = (event: MouseEvent<HTMLElement>) => {
    //     switch(event.type) {
    //         case "mousedown":
    //             setIsDragging(true);
    //             setScrollPosition({ mouse: event.clientX, container: event.target.scrollLeft });
    //             break;
    //         case "mouseup":
    //             setIsDragging(false);
    //             break;
    //         case "mouseleave":
    //             setIsDragging(false);
    //             break;
    //         case "mousemove":
    //             if(isDragging) {
    //                 event.target.scrollLeft = scrollPosition.container + scrollPosition.mouse - event.clientX;
    //             }
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // function handlerWheel(this: HTMLUListElement, event: any) {
    //     event.preventDefault();
    //     setScrollPosition((scrollPosition) => {
    //         const newScrollPosition = scrollPosition - event.deltaY;
    //         const width = - this.getBoundingClientRect().width * 2;
    //         return newScrollPosition > 0 ? 0 : newScrollPosition < width ? width : newScrollPosition;
    //     });
    // }

    return (
        <section className={`${styles.recommendationsSection} ${styles.musicSection}`}>
            <svg className={styles.wave} width="1600" height="300" viewBox="0 0 1600 300">
                <path d="M289.5 141.008C131.5 162.803 27.6667 264.115 0 300H1600V85.187C1507 40.8289 1354.7 -26.5375 1174 10.9244C998.5 47.3082 996 154.465 743.5 191.347C548.714 219.799 481 114.593 289.5 141.008Z"/>
            </svg>
            <div className={styles.background}/>
            <div className={styles.content}>
                <h2 className={styles.title}>{lang.recommendations.title}</h2>
            </div>
            {/* <ul className={`${styles.recommendationsContainer} ${isDragging ? styles.dragged : ""}`} onMouseDown={handleMouseEvents} onMouseUp={handleMouseEvents} onMouseMove={handleMouseEvents} onMouseLeave={handleMouseEvents}> */}
            {/* <ul className={styles.recommendationsContainer} ref={firstList} style={{ transform: `translateX(${scrollPosition}px)` }}> */}
            <HorizontalContainer className={styles.recommendationsContainer}>
                <li className={styles.recommendationsType}>
                    <div className={styles.emojiContainer}>
                        <p className={styles.emoji}>😌</p>
                    </div>
                    <h3 className={styles.title}>{lang.recommendations.calm}</h3>
                </li>
                {data.calm.tracks.map((recommendation, index) => {
                    return (
                        <li key={index}>
                            <RecommendationItem
                                isTrack={true}
                                name={recommendation.name}
                                artists={recommendation.artists}
                                image={recommendation.album.images[0].url}
                                url={recommendation.external_urls.spotify}
                            />
                        </li>
                    )
                })}
            </HorizontalContainer>
            <HorizontalContainer className={styles.recommendationsContainer}>
                <li className={styles.recommendationsType}>
                    <div className={styles.emojiContainer}>
                        <p className={styles.emoji}>⚡</p>
                    </div>
                    <h3 className={styles.title}>{lang.recommendations.energetic}</h3>
                </li>
                {data.energetic.tracks.map((recommendation, index) => {
                    return (
                        <li key={index}>
                            <RecommendationItem
                                isTrack={true}
                                name={recommendation.name}
                                artists={recommendation.artists}
                                image={recommendation.album.images[0].url}
                                url={recommendation.external_urls.spotify}
                            />
                        </li>
                    )
                })}
            </HorizontalContainer>
            <HorizontalContainer className={styles.recommendationsContainer}>
                <li className={styles.recommendationsType}>
                    <div className={styles.emojiContainer}>
                        <p className={styles.emoji}>🤙</p>
                    </div>
                    <h3 className={styles.title}>{lang.recommendations.dancing}</h3>
                </li>
                {data.dancing.tracks.map((recommendation, index) => {
                    return (
                        <li key={index}>
                            <RecommendationItem
                                isTrack={true}
                                name={recommendation.name}
                                artists={recommendation.artists}
                                image={recommendation.album.images[0].url}
                                url={recommendation.external_urls.spotify}
                            />
                        </li>
                    )
                })}
            </HorizontalContainer>
            {/* </ul> */}
        </section>
    )
}

export default RecommendationsSection;