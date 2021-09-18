import { useContext, useRef } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ImportIcon from '@mui/icons-material/ArrowUpward';
import { AppState } from '../../../types/context/AppState';
import CallContext from '../../../context/callContext';
import MethodContext from '../../../context/methodContext';
import CompositionContext from '../../../context/compositionContext';
import SettingsContext from '../../../context/settingsContext';
import { importCalls } from '../../wrappers/callContextWrapper';
import { importMethods } from '../../wrappers/methodContextWrapper';
import { importCompositions } from '../../wrappers/compositionContextWrapper';
import { updateSettings } from '../../wrappers/settingsContextWrapper';

const ImportButton = () => {
  const { dispatch: dispatchCall } = useContext(CallContext);
  const { dispatch: dispatchMethod } = useContext(MethodContext);
  const { dispatch: dispatchComp } = useContext(CompositionContext);
  const { dispatch: dispatchSettings } = useContext(SettingsContext);
  const fileUpload = useRef<HTMLInputElement>(null);

  const setState = (json: string) => {
    const {
      compositions, methods, calls, settings,
    } = JSON.parse(json) as AppState;

    if (!compositions) { throw new Error('composition missing from json'); }
    if (!methods) { throw new Error('methods missing from json'); }
    if (!calls) { throw new Error('calls missing from json.'); }
    if (!settings) { throw new Error('method stage missing from json'); }

    dispatchCall(importCalls(calls));
    dispatchMethod(importMethods(methods));
    dispatchComp(importCompositions(compositions));
    dispatchSettings(updateSettings(settings));
  };

  const importState = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) { throw new Error(''); }

    const file = e.currentTarget.files[0];
    if (file.type !== 'application/json') { throw new Error('file must be a JSON file.'); }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') { throw new Error('file must be a JSON file.'); }
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
      <ListItem button onClick={importStateClick} sx={{ pl: 4 }}>
        <ListItemIcon>
          <ImportIcon />
        </ListItemIcon>
        <ListItemText primary="Import" />
      </ListItem>
    </>
  );
};

export default ImportButton;
