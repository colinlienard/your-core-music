import { FC, useState, useEffect, useRef, memo } from "react";
import { TrackContent } from "../../lib/types";
import styles from "./MusicController.module.scss";

interface Props {
    tracks: TrackContent[]
}

let timeoutFade: ReturnType<typeof setTimeout> | any = null;

const MusicController: FC<Props> = memo(({ tracks }) => {
    const [playing, setPlaying] = useState(true);
    const [trackNumber, setTrackNumber] = useState(0);
    const [track, setTrack] = useState("");
    const [artist, setArtist] = useState("");
    const [finish, setFinish] = useState(false);
    const [width, setWidth] = useState(0);
    const [transition, setTransition] = useState(true);
    const audio: any = useRef<HTMLAudioElement>();
    const progressBar: any = useRef<HTMLSpanElement>();
    const container: any = useRef<HTMLDivElement>();

    useEffect(() => {
        changeAudio();
        setTransition(false);

        return () => clearTimeout(timeoutFade);
    }, [])

    const splitArtists = (artists: { name: string }[]) => {
        if(artists.length === 1)
            return artists[0].name;
        
        let result = "";

        artists.forEach(artist => {
            if(result.length === 0)
                result = artist.name;
            else
                result = `${result}, ${artist.name}`;
        });

        return result;
    }
    
    const calcWidth = (element: HTMLDivElement) => setWidth(element.offsetWidth);

    const fadeVolumeIn = () => {
        setTimeout(() => {
            if(audio.current.volume < .2) {
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
            audio.current.src =  tracks[trackNumber].preview_url;
            audio.current.volume = 0;
            await audio.current.play();
            fadeVolumeIn();

            setTransition(false);
    
            setTimeoutFade();

            calcWidth(container.current);
    
            progressBar.current.style.animationDuration = `${audio.current.duration}s`;
    
            setTrackNumber(trackNumber => trackNumber + 1);
        }
        else
            setFinish(true);
    }

    const toggle = () => {
        if(!transition) {
            if(playing) {
                audio.current.pause();
                clearTimeout(timeoutFade);
                progressBar.current.style.animationPlayState = "paused";
            }
            else {
                audio.current.play();
                setTimeoutFade();
                progressBar.current.style.animationPlayState = "running";
            }
    
            setPlaying(playing => !playing);
        }
    }

    return (
        <div className={`${styles.MusicController} ${finish ? styles.finish : ""} ${transition ? styles.transition : ""}`} onClick={toggle} ref={container}>
            <div className={styles.background} style={{ width: `${width}px` }}/>
            <audio ref={audio} onEnded={changeAudio}/>
            <div className={styles.textContainer}>
                <p className={styles.track}>{track}</p>
                <p className={styles.artist}>{artist}</p>
            </div>
            <div className={`${styles.iconsContainer} ${playing ? styles.playing : styles.notPlaying}`}>
                <span/>
                <span/>
                <span/>
                <span/>
                <svg className={styles.play} width="19" height="20" viewBox="0 0 19 20">
                    <path d="M1.07272 0.278809L18.012 9.98115L0.992889 19.7292L1.07272 0.278809ZM3.05861 3.72111L3.0071 16.2707L13.988 9.98115L3.05861 3.72111Z"/>
                </svg>
                <svg className={styles.pause} width="12" height="20" viewBox="0 0 12 20">
                    <path d="M3 0H0V20H3V0ZM12 0H9V20H12V0Z"/>
                </svg>
            </div>
            <span className={styles.progressBar} ref={progressBar} style={{ width: `${width - 3}px` }}/>
        </div>
    )
})

export default MusicController;