import { FC, useState, useEffect, useRef, memo, useContext } from "react";
import { TrackContent } from "../../lib/types";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { LangContext } from "../../lib/contexts/LangContext";
import styles from "./MusicController.module.scss";
import splitArtists from "../../lib/tools/splitArtists";

interface Props {
    tracks: TrackContent[]
}

let timeoutFade: ReturnType<typeof setTimeout> | any = null;

const MusicController: FC<Props> = ({ tracks }) => {
    const MAX_VOLUME = .2;
    const [playing, setPlaying] = useState(false);
    const [trackNumber, setTrackNumber] = useState(0);
    const [track, setTrack] = useState("");
    const [artist, setArtist] = useState("");
    const [hidden, setHidden] = useState(true);
    const [width, setWidth] = useState(0);
    const [displayError, setDisplayError] = useState(false);
    const [transition, setTransition] = useState(true);
    const audio: any = useRef<HTMLAudioElement>();
    const progressBar: any = useRef<HTMLSpanElement>();
    const container: any = useRef<HTMLDivElement>();
    const { MusicController: lang } = useContext(LangContext);

    useEffect(() => {
        audio.current.volume = 0;
        audio.current.src = tracks[0].preview_url;
        audio.current.play().then(() => {
            startPlaying();
        }).catch(() => {
            setTimeout(() => setDisplayError(true), 1000);
        })

        return () => clearTimeout(timeoutFade);
    }, [])

    const startPlaying = () => {
        changeAudio();
        setPlaying(true);
        setTransition(false);
        setHidden(false);
        setDisplayError(false);
    }
    
    const calcWidth = (element: HTMLDivElement) => setWidth(element.offsetWidth);

    const fadeVolumeIn = () => {
        setTimeout(() => {
            if(audio.current.volume < MAX_VOLUME) {
                audio.current.volume = Math.min(1, audio.current.volume + 0.01);
                fadeVolumeIn();
            }
        }, 50);
    }

    const fadeVolumeOut = () => {
        setTimeout(() => {
            if(audio.current.volume > 0) {
                audio.current.volume = Math.max(0, audio.current.volume - 0.01);
                fadeVolumeOut();
            }
        }, 50);
    }

    const setTimeoutFade = () => {
        timeoutFade = setTimeout(() => {
            fadeVolumeOut();
            setTransition(true);
        }, (audio.current.duration - audio.current.currentTime - 1.5) * 1000);
    }

    const changeAudio = async () => {
        if(trackNumber < tracks.length) {
            setTrack(tracks[trackNumber].name);
            setArtist(splitArtists(tracks[trackNumber].artists));
            
            await audio.current.pause();
            setPlaying(false);
            audio.current.src = tracks[trackNumber].preview_url;
            audio.current.volume = 0;
            await audio.current.play();
            setPlaying(true);
            fadeVolumeIn();

            setTransition(false);
    
            setTimeoutFade();

            calcWidth(container.current);
    
            progressBar.current.style.animationDuration = `${audio.current.duration}s`;
    
            setTrackNumber(trackNumber => trackNumber + 1);
        } else {
            setHidden(true);
        }
    }

    const toggle = () => {
        if(!transition) {
            if(playing) {
                audio.current.pause();
                clearTimeout(timeoutFade);
            } else {
                audio.current.play();
                setTimeoutFade();
            }
    
            setPlaying(playing => !playing);
        }
    }
    
    return (<>
        <div className={`${styles.MusicController} ${hidden ? styles.hidden : ""} ${transition ? styles.transition : ""}`} onClick={toggle} ref={container}>
            <audio ref={audio} onEnded={changeAudio}/>
            <div className={styles.background} style={{ width: `${width}px` }}/>
            <div className={styles.textContainer}>
                <p className={styles.track}>{track}</p>
                <p className={styles.artist}>{artist}</p>
            </div>
            <div className={`${styles.iconsContainer} ${playing ? styles.playing : styles.notPlaying}`}>
                <span/>
                <span/>
                <span/>
                <span/>
                <svg className={styles.play} width="19" height="20" viewBox="0 0 19 20" role="img" aria-label="Play">
                    <path d="M1.07272 0.278809L18.012 9.98115L0.992889 19.7292L1.07272 0.278809ZM3.05861 3.72111L3.0071 16.2707L13.988 9.98115L3.05861 3.72111Z"/>
                </svg>
                <svg className={styles.pause} width="12" height="20" viewBox="0 0 12 20" role="img" aria-label="Pause">
                    <path d="M3 0H0V20H3V0ZM12 0H9V20H12V0Z"/>
                </svg>
            </div>
            <span className={`${styles.progressBar} ${!playing ? styles.paused : null}`} ref={progressBar} style={{ width: `${width}px` }}/>
        </div>
        <ErrorMessage
            title={lang.title}
            content={lang.content}
            success={{ message: lang.agree, action: startPlaying }}
            fail={{ message: lang.disagree,  action: () => setDisplayError(false) }}
            visible={displayError}
        />
    </>)
}

export default memo(MusicController);