import { Composition, NewComposition } from '../compositions';
import ContextState from './ContextState';

export type CompositionAction = { type: 'reset' }
| { type: 'import', payload: Composition[] }
| { type: 'update', payload: Composition }
| { type: 'add', payload: NewComposition }
| { type: 'delete', payload: number };

export interface CompositionState extends ContextState<CompositionAction> {
  compositions: Composition[];
}
