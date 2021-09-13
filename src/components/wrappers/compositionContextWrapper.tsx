import { useReducer } from 'react';
import { ContextWrapperProps, CompositionAction } from '../../types/context';
import { CompositionProvider } from '../../context/compositionContext';
import defaultCompositions from '../../defaults/compositions';
import { Composition } from '../../types/compositions';
import assertUnreachable from '../../helpers/contextHelper';

const compositionReducer = (compositions: Composition[], action: CompositionAction) => {
  switch (action.type) {
    case 'reset':
      return [...defaultCompositions];
    case 'import':
      return [...action.payload];
    case 'update':
      return [...compositions.map(
        (c) => (c.id === action.payload.id ? action.payload : c),
      )];
    case 'add':
      return [...compositions, { ...action.payload, id: compositions.length }];
    case 'delete':
      return [...compositions.filter((c) => c.id !== action.payload)];
    default:
      return assertUnreachable(action);
  }
};

const CompositionContextWrapper = ({ children }: ContextWrapperProps) => {
  const [compositions, dispatch] = useReducer(compositionReducer, defaultCompositions);

  return (
    <CompositionProvider value={{ compositions, dispatch }}>
      {children}
    </CompositionProvider>
  );
};

export default CompositionContextWrapper;
