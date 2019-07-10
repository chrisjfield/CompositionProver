import { IMethod, IMethodActionTypes } from "../../../interfaces/interfaces";
import { DELETE_METHOD, EDIT_METHOD, ADD_METHOD } from "../../actions/actionTypes";
import defaultMethods from "../../../defaults/methods";

export default function (state: IMethod[] = defaultMethods, action: IMethodActionTypes) {
  switch (action.type) {
    case ADD_METHOD: {
      return [...state, action.payload];
    }
    case EDIT_METHOD: {
        return [...state.map((method) => {
            return method.abbreviation === action.payload.abbreviation ? action.payload : method;
          })]
    }
    case DELETE_METHOD: {
      return [...state.filter((method) => method.abbreviation !== action.payload)];
    }
    default:
      return state;
  }
}