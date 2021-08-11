import { createContext, Dispatch, FC, useReducer } from "react";
import { ArtistContent, TrackContent } from "../types";
import { ArtistAction, artistListReducer } from "./reducers/ArtistListReducer";
import { TrackAction, trackListReducer } from "./reducers/TrackListReducer";

type MusicList = {
    artistList: ArtistContent[],
    dispatchArtistList: Dispatch<ArtistAction>,
    trackList: TrackContent[],
    dispatchTrackList: Dispatch<TrackAction>
}

export const MusicListContext = createContext<MusicList>({
    artistList: [],
    dispatchArtistList: () => null,
    trackList: [],
    dispatchTrackList: () => null
});

const MusicListProvider: FC = ({ children }) => {
    const [artistList, dispatchArtistList] = useReducer(artistListReducer, []);
    const [trackList, dispatchTrackList] = useReducer(trackListReducer, []);

    return (
        <MusicListContext.Provider value={{ artistList, dispatchArtistList, trackList, dispatchTrackList }}>
            {children}
        </MusicListContext.Provider>
    )
}

export default MusicListProvider;