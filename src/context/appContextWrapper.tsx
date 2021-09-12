import { ContextWrapperProps } from '../types/context';
import CallContextWrapper from './callContextWrapper';

const AppContextWrapper = ({ children }: ContextWrapperProps) => (
  <CallContextWrapper>
    {children}
  </CallContextWrapper>
);

export default AppContextWrapper;
