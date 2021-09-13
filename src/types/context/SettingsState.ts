import Settings from '../settings';
import ContextState from './ContextState';

export type SettingsAction = { type: 'reset' }
| { type: 'update', payload: Settings };

export interface SettingsState extends ContextState<SettingsAction> {
  settings: Settings;
}
