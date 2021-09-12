import { ISavedComposition, ISavedCompositionActionTypes } from "../../interfaces/interfaces";
import { ADD_COMPOSITION, EDIT_COMPOSITION, DELETE_COMPOSITION } from "../actions/actionTypes";

export default function (state: ISavedComposition[] = [], action: ISavedCompositionActionTypes) {
    switch (action.type) {
        case ADD_COMPOSITION: {
            return [...state, action.payload];
        }
        case EDIT_COMPOSITION: {
            return action.payload;
        }
        case DELETE_COMPOSITION: {
            return [...state.filter((composition) => composition.name !== action.payload)];
        }
        default:
            return state;
    }
}
