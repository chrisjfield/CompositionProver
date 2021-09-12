import { createContext } from 'react';
import { CallState } from '../types/context';

const CallContext = createContext<CallState>({} as CallState);
export const CallProvider = CallContext.Provider;
export default CallContext;
