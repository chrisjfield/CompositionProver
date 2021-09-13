import { ContextWrapperProps } from '../../types/context';
import CallContextWrapper from './callContextWrapper';
import CompositionContextWrapper from './compositionContextWrapper';
import MethodContextWrapper from './methodContextWrapper';
import SettingsContextWrapper from './settingsContextWrapper';

const AppContextWrapper = ({ children }: ContextWrapperProps) => (
  <SettingsContextWrapper>
    <CallContextWrapper>
      <MethodContextWrapper>
        <CompositionContextWrapper>
          {children}
        </CompositionContextWrapper>
      </MethodContextWrapper>
    </CallContextWrapper>
  </SettingsContextWrapper>
);

export default AppContextWrapper;
