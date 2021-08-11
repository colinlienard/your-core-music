import { TrackContent } from "../../types";

export type TrackAction = { type: "reset", value: TrackContent[] } | { type: "add", value: TrackContent[] };

export const trackListReducer = (state: TrackContent[], action: TrackAction) => {
    switch(action.type) {
        case "reset":
            return action.value;
        case "add":
            return [...state, ...action.value];
    }
}