import Call from '../calls';
import ContextState from './ContextState';

export type CallAction = { type: 'reset' } | { type: 'import', payload: Call[] } | { type: 'update', payload: Call };

export interface CallState extends ContextState<CallAction> {
  calls: Call[]
}
