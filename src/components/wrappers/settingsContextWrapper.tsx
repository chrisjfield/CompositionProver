import { useReducer } from 'react';
import { ContextWrapperProps, SettingsAction } from '../../types/context';
import { SettingsProvider } from '../../context/settingsContext';
import defaultSettings from '../../defaults/settings';
import Settings from '../../types/settings';
import asertUnreachable from '../../helpers/contextHelper';

const settingsReducer = (settings: Settings, action: SettingsAction) => {
  switch (action.type) {
    case 'reset':
      return { ...defaultSettings };
    case 'update':
      return { ...action.payload };
    default:
      return asertUnreachable(action);
  }
};

const SettingsContextWrapper = ({ children }: ContextWrapperProps) => {
  const [settings, dispatch] = useReducer(settingsReducer, defaultSettings);

  return (
    <SettingsProvider value={{ settings, dispatch }}>
      {children}
    </SettingsProvider>
  );
};

export default SettingsContextWrapper;
