import { useEffect, useReducer } from 'react';
import {
  AddMethodAction, ContextWrapperProps, DeleteMethodAction,
  ImportMethodAction, MethodAction, ResetMethodAction,
  UpdateMethodAction,
} from '../../types/context';
import { MethodProvider } from '../../context/methodContext';
import defaultMethods from '../../defaults/methods';
import { Method, NewMethod } from '../../types/methods';
import assertUnreachable from '../../helpers/contextHelper';

const methodContextInitializer = (initialValue: Method[]) => {
  const persistedState = localStorage.getItem('methodState');
  return persistedState ? JSON.parse(persistedState) : initialValue;
};

const methodReducer = (methods: Method[], action: MethodAction) => {
  switch (action.type) {
    case 'reset':
      return [...defaultMethods];
    case 'import':
      return [...action.payload];
    case 'update':
      return [...methods.map(
        (m) => (m.id === action.payload.id ? action.payload : m),
      )];
    case 'add':
      return [...methods, { ...action.payload, id: methods.length }];
    case 'delete':
      return [...methods.filter((m) => m.id !== action.payload)];
    default:
      return assertUnreachable(action);
  }
};

export const MethodContextWrapper = ({ children }: ContextWrapperProps) => {
  const [methods, dispatch] = useReducer(methodReducer, defaultMethods, methodContextInitializer);

  useEffect(() => {
    localStorage.setItem('methodState', JSON.stringify(methods));
  }, [methods]);

  return (
    <MethodProvider value={{ methods, dispatch }}>
      {children}
    </MethodProvider>
  );
};

export const resetMethods = (): ResetMethodAction => ({ type: 'reset' });

export const importMethods = (methods: Method[]): ImportMethodAction => (
  { type: 'import', payload: methods }
);

export const updateMethod = (method: Method): UpdateMethodAction => (
  { type: 'update', payload: method }
);

export const addMethod = (stage: number): AddMethodAction => {
  const newMethod: NewMethod = {
    name: 'New Custom Method',
    abbreviation: `ncm${stage}`,
    stage,
    placeNotation: '',
    defaultBob: 'b',
    defaultSingle: 's',
  };

  return (
    { type: 'add', payload: newMethod }
  );
};

export const lookupMethod = (newMethod: NewMethod): AddMethodAction => (
  { type: 'add', payload: newMethod }
);

export const deleteMethod = (id: number): DeleteMethodAction => ({ type: 'delete', payload: id });
