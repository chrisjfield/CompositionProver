import { createContext } from 'react';
import { AlertState } from '../types/context';

const AlertContext = createContext<AlertState>({} as AlertState);
export const AlertProvider = AlertContext.Provider;
export default AlertContext;
