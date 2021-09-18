import { useContext } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ResetIcon from '@mui/icons-material/Autorenew';
import CallContext from '../../../context/callContext';
import MethodContext from '../../../context/methodContext';
import CompositionContext from '../../../context/compositionContext';
import SettingsContext from '../../../context/settingsContext';
import { resetCalls } from '../../wrappers/callContextWrapper';
import { resetMethods } from '../../wrappers/methodContextWrapper';
import { resetCompositions } from '../../wrappers/compositionContextWrapper';
import { resetSettings } from '../../wrappers/settingsContextWrapper';

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
    <ListItem button onClick={resetState} sx={{ pl: 4 }}>
      <ListItemIcon>
        <ResetIcon />
      </ListItemIcon>
      <ListItemText primary="Reset" />
    </ListItem>
  );
};

export default ResetButton;
