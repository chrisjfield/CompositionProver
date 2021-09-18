import { ContextWrapperProps } from '../../types/context';
import { CallContextWrapper } from './callContextWrapper';
import { CompositionContextWrapper } from './compositionContextWrapper';
import { MethodContextWrapper } from './methodContextWrapper';
import { SettingsContextWrapper } from './settingsContextWrapper';
import AlertContextWrapper from './alertContextWrapper';

const AppContextWrapper = ({ children }: ContextWrapperProps) => (
  <SettingsContextWrapper>
    <CallContextWrapper>
      <MethodContextWrapper>
        <CompositionContextWrapper>
          <AlertContextWrapper>
            {children}
          </AlertContextWrapper>
        </CompositionContextWrapper>
      </MethodContextWrapper>
    </CallContextWrapper>
  </SettingsContextWrapper>
);

export default AppContextWrapper;
