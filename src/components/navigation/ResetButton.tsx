import { useContext } from 'react';
import CallContext from '../../context/callContext';
import MethodContext from '../../context/methodContext';
import CompositionContext from '../../context/compositionContext';
import SettingsContext from '../../context/settingsContext';
import { resetCalls } from '../wrappers/callContextWrapper';
import { resetMethods } from '../wrappers/methodContextWrapper';
import { resetCompositions } from '../wrappers/compositionContextWrapper';
import { resetSettings } from '../wrappers/settingsContextWrapper';
import ResetIcon from '../icons/ResetIcon';

const ResetButton = () => {
  const { dispatch: dispatchCall } = useContext(CallContext);
  const { dispatch: dispatchMethod } = useContext(MethodContext);
  const { dispatch: dispatchComp } = useContext(CompositionContext);
  const { dispatch: dispatchSettings } = useContext(SettingsContext);

  const resetState = () => {
    dispatchCall(resetCalls());
    dispatchMethod(resetMethods());
    dispatchComp(resetCompositions());
    dispatchSettings(resetSettings());
  };

  return (
    <button onClick={resetState} type="button" className="flex items-center relative rounded-lg hover:bg-blue-900 text-gray-200 hover:text-white mx-2 mt-1 ml-6 px-3 py-2 pr-6">
      <ResetIcon className="w-6 h-6 fill-current" />
      <p className="ml-3 text-base">
        Reset
      </p>
    </button>
  );
};

export default ResetButton;
