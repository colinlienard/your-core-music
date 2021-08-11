import { ArtistContent } from "../../types";

export type ArtistAction = { type: "reset", value: ArtistContent[] } | { type: "add", value: ArtistContent[] };

export const artistListReducer = (state: ArtistContent[], action: ArtistAction) => {
    switch(action.type) {
        case "reset":
            return action.value;
        case "add":
            return [...state, ...action.value];
    }
}