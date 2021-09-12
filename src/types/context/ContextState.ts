import { Dispatch } from 'react';

interface ContextState<T> {
  dispatch: Dispatch<T>
}

export default ContextState;
