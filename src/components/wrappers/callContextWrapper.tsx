import { useEffect, useReducer } from 'react';
import {
  ContextWrapperProps, CallAction, ResetCallAction, UpdateCallAction, ImportCallAction,
} from '../../types/context';
import { CallProvider } from '../../context/callContext';
import defaultCalls from '../../defaults/calls';
import { Call } from '../../types/calls';
import assertUnreachable from '../../helpers/contextHelper';

const callContextInitializer = (initialValue: Call[]) => {
  const persistedState = localStorage.getItem('callState');
  return persistedState ? JSON.parse(persistedState) : initialValue;
};

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

export const CallContextWrapper = ({ children }: ContextWrapperProps) => {
  const [calls, dispatch] = useReducer(callReducer, defaultCalls, callContextInitializer);

  useEffect(() => {
    localStorage.setItem('callState', JSON.stringify(calls));
  }, [calls]);

  return (
    <CallProvider value={{ calls, dispatch }}>
      {children}
    </CallProvider>
  );
};

export const resetCalls = (): ResetCallAction => ({ type: 'reset' });

export const importCalls = (calls: Call[]): ImportCallAction => ({ type: 'import', payload: calls });

export const updateCall = (call: Call): UpdateCallAction => ({ type: 'update', payload: call });
