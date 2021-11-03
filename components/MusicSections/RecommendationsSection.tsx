import { FC, useContext  } from "react";
import { LangContext } from "../../lib/contexts/LangContext";
import { allRecommendations } from "../../lib/types";
import HorizontalContainer from "../HorizontalContainer/HorizontalContainer";
import RecommendationItem from "../MusicItems/RecommendationItem/RecommendationItem";
import styles from "./MusicSection.module.scss";

interface Props {
    data: allRecommendations
}

const RecommendationsSection: FC<Props> = ({ data }) => {
    const { Stats: lang } = useContext(LangContext);

    return (
        <section className={`${styles.recommendationsSection} ${styles.musicSection}`}>
            <svg className={styles.wave} width="1600" height="300" viewBox="0 0 1600 300">
                <path d="M289.5 141.008C131.5 162.803 27.6667 264.115 0 300H1600V85.187C1507 40.8289 1354.7 -26.5375 1174 10.9244C998.5 47.3082 996 154.465 743.5 191.347C548.714 219.799 481 114.593 289.5 141.008Z"/>
            </svg>
            <div className={styles.background}/>
            <div className={styles.content}>
                <h2 className={styles.title}>{lang.recommendations.title}</h2>
            </div>
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
        </section>
    )
}

export default RecommendationsSection;