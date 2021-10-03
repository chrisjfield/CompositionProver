import { useContext } from 'react';
import { Divider, Grid } from '@mui/material';
import CallContext from '../../context/callContext';
import SettingsContext from '../../context/settingsContext';
import EditableCall from './editableCall';

const CallsTab = () => {
  const { calls } = useContext(CallContext);
  const { settings: { methodStage } } = useContext(SettingsContext);

  return (
    <Grid container justifyContent="space-evenly" spacing={3}>
      {calls
        .filter((c) => c.stage === methodStage)
        .map((c) => (
          <Grid item xs={12} xl={6} key={`call_${c.abbreviation}_${c.stage}`}>
            <EditableCall call={c} />
            <Divider sx={{ maxWidth: '700px', m: 'auto' }} />
          </Grid>
        ))}
    </Grid>
  );
};

export default CallsTab;
