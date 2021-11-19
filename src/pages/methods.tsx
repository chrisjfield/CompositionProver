import { useContext } from 'react';
import { Divider, Grid } from '@mui/material';
import MethodContext from '../context/methodContext';
import SettingsContext from '../context/settingsContext';
import StageSelector from '../components/stageSelector/stageSelector';
import EditableMethod from '../components/methods/editableMethod';
import MethodButtons from '../components/methods/methodButtons';

const MethodsPage = () => {
  const { methods } = useContext(MethodContext);
  const { settings: { methodStage } } = useContext(SettingsContext);

  return (
    <>
      <StageSelector />
      <Grid container justifyContent="space-evenly" spacing={3}>
        {methods
          .filter((m) => m.stage === methodStage)
          .map((m) => (
            <Grid item xs={12} key={`method_${m.id}`}>
              <EditableMethod method={m} />
              <Divider sx={{ m: 'auto' }} />
            </Grid>
          ))}
      </Grid>
      <MethodButtons />
    </>
  );
};

export default MethodsPage;
