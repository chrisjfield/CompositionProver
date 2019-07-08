import { ICall, ICallActionTypes } from "../../../interfaces/interfaces";
import { EDIT_CALL } from "../../actions/actionTypes";
import defaultCalls from "../../../defaults/calls";

export default function (state: ICall[] = defaultCalls, action: ICallActionTypes) {
  switch (action.type) {
    case EDIT_CALL: {
      return [...state.map((call) => {
        return call.abbreviation === action.payload.abbreviation && call.stage === action.payload.stage ? action.payload : call;
      })]
    }
    default:
      return state;
  }
}
