import { useEffect, useReducer } from 'react';
import {
  ContextWrapperProps, CompositionAction, ResetCompositionAction,
  AddCompositionAction, DeleteCompositionAction, UpdateCompositionAction,
  ImportCompositionAction,
} from '../../types/context';
import { CompositionProvider } from '../../context/compositionContext';
import defaultCompositions from '../../defaults/compositions';
import { Composition } from '../../types/compositions';
import assertUnreachable from '../../helpers/contextHelper';
import NewComposition from '../../types/compositions/newComposition';

const compositionContextInitializer = (initialValue: Composition[]) => {
  const persistedState = localStorage.getItem('compositionState');
  return persistedState ? JSON.parse(persistedState) : initialValue;
};

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

export const CompositionContextWrapper = ({ children }: ContextWrapperProps) => {
  const [compositions, dispatch] = useReducer(
    compositionReducer, defaultCompositions, compositionContextInitializer,
  );

  useEffect(() => {
    localStorage.setItem('compositionState', JSON.stringify(compositions));
  }, [compositions]);

  return (
    <CompositionProvider value={{ compositions, dispatch }}>
      {children}
    </CompositionProvider>
  );
};

export const resetCompositions = (): ResetCompositionAction => ({ type: 'reset' });

export const importCompositions = (compositions: Composition[]): ImportCompositionAction => (
  { type: 'import', payload: compositions }
);

export const updateComposition = (composition: Composition): UpdateCompositionAction => (
  { type: 'update', payload: composition }
);

export const addComposition = (newComposition: NewComposition): AddCompositionAction => (
  { type: 'add', payload: newComposition }
);

export const deleteComposition = (id: number): DeleteCompositionAction => ({ type: 'delete', payload: id });
