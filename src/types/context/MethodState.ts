import { Method, NewMethod } from '../methods';
import ContextState from './ContextState';

export type MethodAction = { type: 'reset' }
| { type: 'import', payload: Method[] }
| { type: 'update', payload: Method }
| { type: 'delete', payload: Number }
| { type: 'add', payload: NewMethod };

export interface MethodState extends ContextState<MethodAction> {
  methods: Method[];
}
