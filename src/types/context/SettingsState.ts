import Settings from '../settings';
import ContextState from './ContextState';

export type ResetSettingsAction = { type: 'reset' };
export type UpdateSettingsAction = { type: 'update', payload: Settings };

export type SettingsAction = ResetSettingsAction | UpdateSettingsAction;

export interface SettingsState extends ContextState<SettingsAction> {
  settings: Settings;
}
