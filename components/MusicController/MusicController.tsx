import { FC, useState, useEffect, useRef } from "react";
import { TrackContent } from "../../lib/types";
import styles from "./MusicController.module.scss";

interface Props {
    tracks: TrackContent[]
}

let timeoutFade: ReturnType<typeof setTimeout> | any = null;

const MusicController: FC<Props> = ({ tracks }) => {
    const [playing, setPlaying] = useState(true);
    const [trackNumber, setTrackNumber] = useState(0);
    const [track, setTrack] = useState("");
    const [artist, setArtist] = useState("");
    const [finish, setFinish] = useState(false);
    const audio: { current: HTMLAudioElement } | any = useRef();
    const progressBar: { current: HTMLSpanElement } | any = useRef();

    useEffect(() => {
        changeAudio();
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

    const setTimeoutFade = () => timeoutFade = setTimeout(fadeVolumeOut, (audio.current.duration - audio.current.currentTime - 2) * 1000);

    const changeAudio = async () => {
        if(trackNumber < tracks.length) {
            setTrack(tracks[trackNumber].name);
            setArtist(splitArtists(tracks[trackNumber].artists));
    
            await audio.current.pause();
            audio.current.src =  tracks[trackNumber].preview_url;
            audio.current.volume = 0;
            await audio.current.play();
            fadeVolumeIn();
    
            setTimeoutFade();
    
            progressBar.current.style.animationDuration = `${audio.current.duration}s`;
    
            setTrackNumber(trackNumber => trackNumber + 1);
        }
        else
            setFinish(true);
    }

    const toggle = () => {
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

    return (
        <div className={`${styles.MusicController} ${finish ? styles.finish : null}`} onClick={toggle}>
            <audio ref={audio} onEnded={changeAudio}/>
            <div className={styles.textContainer}>
                <p className={styles.track}>{track}</p>
                <p className={styles.artist}>{artist}</p>
            </div>
            <div className={styles.iconsContainer}>
                <span/>
                <span/>
                <span/>
                <span/>
            </div>
            <span className={styles.progressBar} ref={progressBar}/>
        </div>
    )
}

export default MusicController;