import Call from '../calls';
import ContextState from './ContextState';

export type ResetCallAction = { type: 'reset' };
export type ImportCallAction = { type: 'import', payload: Call[] };
export type UpdateCallAction = { type: 'update', payload: Call };

export type CallAction = ResetCallAction | ImportCallAction | UpdateCallAction;

export interface CallState extends ContextState<CallAction> {
  calls: Call[];
}
