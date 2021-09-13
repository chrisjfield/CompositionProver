import { Composition, NewComposition } from '../compositions';
import ContextState from './ContextState';

export type ResetCompositionAction = { type: 'reset' };
export type ImportCompositionAction = { type: 'import', payload: Composition[] };
export type UpdateCompositionAction = { type: 'update', payload: Composition };
export type AddCompositionAction = { type: 'add', payload: NewComposition };
export type DeleteCompositionAction = { type: 'delete', payload: number };

export type CompositionAction = ResetCompositionAction
| ImportCompositionAction
| UpdateCompositionAction
| AddCompositionAction
| DeleteCompositionAction;

export interface CompositionState extends ContextState<CompositionAction> {
  compositions: Composition[];
}
