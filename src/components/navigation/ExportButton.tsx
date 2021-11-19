import { useContext } from 'react';
import { AppState } from '../../types/context';
import CallContext from '../../context/callContext';
import MethodContext from '../../context/methodContext';
import CompositionContext from '../../context/compositionContext';
import SettingsContext from '../../context/settingsContext';
import ExportIcon from '../icons/ExportIcon';

const ExportButton = () => {
  const { calls } = useContext(CallContext);
  const { methods } = useContext(MethodContext);
  const { compositions } = useContext(CompositionContext);
  const { settings } = useContext(SettingsContext);

  const exportState = () => {
    const appState: AppState = {
      calls, methods, compositions, settings,
    };
    const jsonData = JSON.stringify(appState);
    const blob = new Blob([jsonData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'CompositionProverExport.json';
    link.href = url;
    link.click();
  };

  return (
    <button onClick={exportState} type="button" className="flex items-center relative rounded-lg hover:bg-brand-primary-dark text-gray-200 hover:text-white mx-2 mt-1 ml-6 px-3 py-2 pr-6">
      <ExportIcon className="w-6 h-6 fill-current" />
      <p className="ml-3 text-base">
        Export
      </p>
    </button>
  );
};

export default ExportButton;
