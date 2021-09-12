import {
	ICompositionActionTypes,
	IComposition,
} from '../../../interfaces/interfaces';
import { EDIT_CURRENT_COMPOSITION } from '../../actions/actionTypes';
import defaultComposition from '../../../defaults/composition';

export default function(
	state: IComposition = defaultComposition,
	action: ICompositionActionTypes,
) {
	switch (action.type) {
		case EDIT_CURRENT_COMPOSITION: {
			return action.payload;
		}
		default:
			return state;
	}
}
