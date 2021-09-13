import { createContext } from 'react';
import { SettingsState } from '../types/context';

const SettingsContext = createContext<SettingsState>({} as SettingsState);
export const SettingsProvider = SettingsContext.Provider;
export default SettingsContext;
