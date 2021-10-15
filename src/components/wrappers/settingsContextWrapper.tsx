import { useEffect, useReducer } from 'react';
import {
  ContextWrapperProps, ResetSettingsAction, SettingsAction,
  UpdateSettingsAction,
} from '../../types/context';
import { SettingsProvider } from '../../context/settingsContext';
import defaultSettings from '../../defaults/settings';
import Settings from '../../types/settings';
import assertUnreachable from '../../helpers/contextHelper';

const settingsContextInitializer = (initialValue: Settings) => {
  const persistedState = localStorage.getItem('settingsState');
  return persistedState ? JSON.parse(persistedState) : initialValue;
};

const settingsReducer = (settings: Settings, action: SettingsAction) => {
  switch (action.type) {
    case 'reset':
      return { ...defaultSettings };
    case 'update':
      return { ...action.payload };
    default:
      return assertUnreachable(action);
  }
};

export const SettingsContextWrapper = ({ children }: ContextWrapperProps) => {
  const [settings, dispatch] = useReducer(
    settingsReducer, defaultSettings, settingsContextInitializer,
  );

  useEffect(() => {
    localStorage.setItem('settingsState', JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsProvider value={{ settings, dispatch }}>
      {children}
    </SettingsProvider>
  );
};

export const resetSettings = (): ResetSettingsAction => ({ type: 'reset' });

export const updateSettings = (settings: Settings): UpdateSettingsAction => ({ type: 'update', payload: settings });
