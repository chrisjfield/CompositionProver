import { useContext, useRef } from 'react';
import { AppState } from '../../types/context';
import CallContext from '../../context/callContext';
import MethodContext from '../../context/methodContext';
import CompositionContext from '../../context/compositionContext';
import SettingsContext from '../../context/settingsContext';
import { importCalls } from '../wrappers/callContextWrapper';
import { importMethods } from '../wrappers/methodContextWrapper';
import { importCompositions } from '../wrappers/compositionContextWrapper';
import { updateSettings } from '../wrappers/settingsContextWrapper';
import AlertContext from '../../context/alertContext';
import ImportIcon from '../icons/ImportIcon';

const ImportButton = () => {
  const { dispatch: dispatchCall } = useContext(CallContext);
  const { dispatch: dispatchMethod } = useContext(MethodContext);
  const { dispatch: dispatchComp } = useContext(CompositionContext);
  const { dispatch: dispatchSettings } = useContext(SettingsContext);
  const { showError, showSuccess } = useContext(AlertContext);
  const fileUpload = useRef<HTMLInputElement>(null);

  const setState = (json: string) => {
    const {
      compositions, methods, calls, settings,
    } = JSON.parse(json) as AppState;

    if (!compositions) { showError('Composition missing from json'); return; }
    if (!methods) { showError('Methods missing from json'); return; }
    if (!calls) { showError('Calls missing from json.'); return; }
    if (!settings) { showError('Settings missing from json'); return; }

    dispatchCall(importCalls(calls));
    dispatchMethod(importMethods(methods));
    dispatchComp(importCompositions(compositions));
    dispatchSettings(updateSettings(settings));
    showSuccess('File Imported');
  };

  const importState = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) { showError('No file selected'); return; }

    const file = e.currentTarget.files[0];
    if (file.type !== 'application/json') { showError('File must be a JSON file.'); return; }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') { showError('File must be a JSON file.'); return; }
      setState(reader.result);
    };
    reader.readAsText(file);
  };

  const importStateClick = () => {
    if (fileUpload && fileUpload.current) { fileUpload.current.click(); }
  };

  return (
    <>
      <input
        hidden
        ref={fileUpload}
        accept=".json"
        id="raised-button-file"
        type="file"
        onChange={importState}
      />
      <button onClick={importStateClick} type="button" className="flex items-center relative rounded-lg hover:bg-blue-900 text-gray-200 hover:text-white mx-2 mt-1 ml-6 px-3 py-2 pr-6">
        <ImportIcon className="w-6 h-6 fill-current" />
        <p className="ml-3 text-base">
          Import
        </p>
      </button>
    </>
  );
};

export default ImportButton;
