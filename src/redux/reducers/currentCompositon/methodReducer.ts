import { IMethod, IMethodActionTypes } from '../../../interfaces/interfaces';
import {
	DELETE_METHOD,
	EDIT_METHOD,
	ADD_METHOD,
} from '../../actions/actionTypes';
import defaultMethods from '../../../defaults/methods';
import { EDIT_METHODS } from '../../actions/actionTypes';

export default function(
	state: IMethod[] = [...defaultMethods],
	action: IMethodActionTypes,
) {
	switch (action.type) {
		case ADD_METHOD: {
			return [...state, { ...action.payload, id: state.length }];
		}
		case EDIT_METHOD: {
            action.payload.placeNotation = action.payload.placeNotation.toUpperCase();
			return [
				...state.map(method => {
					return method.id === action.payload.id
						? action.payload
						: method;
				}),
			];
		}
		case EDIT_METHODS: {
			return [...action.payload]
		}
		case DELETE_METHOD: {
			return [...state.filter(method => method.id !== action.payload)];
		}
		default:
			return state;
	}
}
