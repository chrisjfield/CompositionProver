import { Method, NewMethod } from '../methods';
import ContextState from './ContextState';

export type ResetMethodAction = { type: 'reset' };
export type ImportMethodAction = { type: 'import', payload: Method[] };
export type UpdateMethodAction = { type: 'update', payload: Method };
export type AddMethodAction = { type: 'add', payload: NewMethod };
export type DeleteMethodAction = { type: 'delete', payload: number };

export type MethodAction = ResetMethodAction
| ImportMethodAction
| UpdateMethodAction
| AddMethodAction
| DeleteMethodAction;

export interface MethodState extends ContextState<MethodAction> {
  methods: Method[];
}
