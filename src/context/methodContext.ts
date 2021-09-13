import { createContext } from 'react';
import { MethodState } from '../types/context';

const MethodContext = createContext<MethodState>({} as MethodState);
export const MethodProvider = MethodContext.Provider;
export default MethodContext;
