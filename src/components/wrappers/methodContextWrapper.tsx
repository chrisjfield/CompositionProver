import { useReducer } from 'react';
import { ContextWrapperProps, MethodAction } from '../../types/context';
import { MethodProvider } from '../../context/methodContext';
import defaultMethods from '../../defaults/methods';
import { Method } from '../../types/methods';
import assertUnreachable from '../../helpers/contextHelper';

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

const MethodContextWrapper = ({ children }: ContextWrapperProps) => {
  const [methods, dispatch] = useReducer(methodReducer, defaultMethods);

  return (
    <MethodProvider value={{ methods, dispatch }}>
      {children}
    </MethodProvider>
  );
};

export default MethodContextWrapper;
