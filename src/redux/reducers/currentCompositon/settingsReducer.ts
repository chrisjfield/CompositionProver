import { ISettings, ISettingsActionTypes } from "../../../interfaces/interfaces";
import { EDIT_SETTINGS } from "../../actions/actionTypes";
import defaultSettings from "../../../defaults/settings";

export default function (state: ISettings = defaultSettings, action: ISettingsActionTypes) {
    switch (action.type) {
        case EDIT_SETTINGS: {
            return action.payload;
        }
        default:
            return state;
    }
}