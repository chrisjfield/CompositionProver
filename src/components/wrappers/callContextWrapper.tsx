import { useReducer } from 'react';
import { ContextWrapperProps, CallAction } from '../../types/context';
import { CallProvider } from '../../context/callContext';
import defaultCalls from '../../defaults/calls';
import Call from '../../types/calls';
import assertUnreachable from '../../helpers/contextHelper';

const callReducer = (calls: Call[], action: CallAction) => {
  switch (action.type) {
    case 'reset':
      return [...defaultCalls];
    case 'import':
      return [...action.payload];
    case 'update':
      return [...calls.map(
        (call) => (
          call.abbreviation === action.payload.abbreviation
          && call.stage === action.payload.stage
            ? action.payload
            : call
        ),
      )];
    default:
      return assertUnreachable(action);
  }
};

const CallContextWrapper = ({ children }: ContextWrapperProps) => {
  const [calls, dispatch] = useReducer(callReducer, defaultCalls);

  return (
    <CallProvider value={{ calls, dispatch }}>
      {children}
    </CallProvider>
  );
};

export default CallContextWrapper;
