import { useContext } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExportIcon from '@mui/icons-material/ArrowDownward';
import { AppState } from '../../../types/context/AppState';
import CallContext from '../../../context/callContext';
import MethodContext from '../../../context/methodContext';
import CompositionContext from '../../../context/compositionContext';
import SettingsContext from '../../../context/settingsContext';

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
    <ListItem button onClick={exportState} sx={{ pl: 4 }}>
      <ListItemIcon>
        <ExportIcon />
      </ListItemIcon>
      <ListItemText primary="Export" />
    </ListItem>
  );
};

export default ExportButton;
