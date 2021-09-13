import { useContext } from 'react';
import CallContext from './context/callContext';
import { updateCall } from './components/wrappers/callContextWrapper';
import MethodContext from './context/methodContext';
import CompositionContext from './context/compositionContext';
import SettingsContext from './context/settingsContext';
import { updateMethod } from './components/wrappers/methodContextWrapper';
import { updateComposition } from './components/wrappers/compositionContextWrapper';
import { updateSettings } from './components/wrappers/settingsContextWrapper';

const App = () => {
  const { calls, dispatch: dispatchCall } = useContext(CallContext);
  const { methods, dispatch: dispatchMethod } = useContext(MethodContext);
  const { compositions, dispatch: dispatchComp } = useContext(CompositionContext);
  const { settings, dispatch: dispatchSettings } = useContext(SettingsContext);

  return (
    <div className="App">
      <p>
        {JSON.stringify(calls[0])}
        <br />
        {JSON.stringify(methods[0])}
        <br />
        {JSON.stringify(compositions[0])}
        <br />
        {JSON.stringify(settings)}
      </p>
      <button type="button" onClick={() => { dispatchCall(updateCall({ ...calls[0], name: calls[0].name += '1' })); }}>
        Call
      </button>
      <br />
      <button type="button" onClick={() => { dispatchMethod(updateMethod({ ...methods[0], name: methods[0].name += '1' })); }}>
        Method
      </button>
      <br />
      <button
        type="button"
        onClick={() => {
          dispatchComp(
            updateComposition({ ...compositions[0], name: compositions[0].name += '1' }),
          );
        }}
      >
        Comp
      </button>
      <br />
      <button
        type="button"
        onClick={() => {
          dispatchSettings(
            updateSettings({ methodStage: settings.methodStage + 1 }),
          );
        }}
      >
        Settings
      </button>
    </div>
  );
};

export default App;
