import { IMethod, IMethodActionTypes } from '../../../interfaces/interfaces';
import {
	DELETE_METHOD,
	EDIT_METHOD,
	ADD_METHOD,
} from '../../actions/actionTypes';
import defaultMethods from '../../../defaults/methods';

export default function(
	state: IMethod[] = defaultMethods,
	action: IMethodActionTypes,
) {
	switch (action.type) {
		case ADD_METHOD: {
			return [...state, { ...action.payload, id: state.length }];
		}
		case EDIT_METHOD: {
			return [
				...state.map(method => {
					return method.id === action.payload.id
						? action.payload
						: method;
				}),
			];
		}
		case DELETE_METHOD: {
			return [...state.filter(method => method.id !== action.payload)];
		}
		default:
			return state;
	}
}
