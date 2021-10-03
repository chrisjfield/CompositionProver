import { useContext, useState } from 'react';
import { Fab, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MethodContext from '../../context/methodContext';
import SettingsContext from '../../context/settingsContext';
import { addMethod } from '../wrappers/methodContextWrapper';
import MethodDialog from './methodDialog';

const MethodButtons = () => {
  const { settings: { methodStage } } = useContext(SettingsContext);
  const { dispatch } = useContext(MethodContext);

  const [open, setOpen] = useState(false);

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 1, md: 3 }}
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Fab
        variant="extended"
        color="primary"
        onClick={() => setOpen(true)}
      >
        <AddIcon />
        Lookup Method
      </Fab>
      <Fab
        variant="extended"
        color="primary"
        onClick={() => dispatch(addMethod(methodStage))}
      >
        <AddIcon />
        Create Method
      </Fab>
      <MethodDialog
        open={open}
        stage={methodStage}
        onClose={() => setOpen(false)}
      />
    </Stack>
  );
};

export default MethodButtons;
