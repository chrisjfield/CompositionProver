import { useContext } from 'react';
import {
  Stack, MenuItem, IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MethodContext from '../../context/methodContext';
import { EditableMethodProps } from '../../types/methods';
import { updateMethod, deleteMethod } from '../wrappers/methodContextWrapper';
import Method from '../../types/methods/method';
import TextField from '../wrappers/materialWrappers';
import CallContext from '../../context/callContext';
import SettingsContext from '../../context/settingsContext';

const EditableMethod = ({ method }: EditableMethodProps) => {
  const { dispatch } = useContext(MethodContext);
  const { calls } = useContext(CallContext);
  const { settings: { methodStage } } = useContext(SettingsContext);
  // const validNotation = isValidCallNotation(call.stage, call[property]);

  const handleChange = (property: keyof Method) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    dispatch(updateMethod({ ...method, [property]: value }));
  };

  const getCallDropdownValues = (searchString: string) => calls
    .filter(
      ({ name, stage }) => ((stage === methodStage) && (name.includes(searchString) || name.includes('User'))),
    ).map(({ abbreviation, name }) => (
      <MenuItem key={abbreviation} value={abbreviation}>
        {name}
      </MenuItem>
    ));

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 0, md: 3 }}
      justifyContent="space-evenly"
      alignItems="center"
    >
      <TextField
        label="Name"
        value={method.name}
        onChange={handleChange('name')}
      />
      <TextField
        label="Abbreviation"
        value={method.abbreviation}
        onChange={handleChange('abbreviation')}
      />
      <TextField
        label="Place Notation"
        value={method.placeNotation}
        onChange={handleChange('placeNotation')}
      />
      <TextField
        select
        label="Default Bob"
        value={method.defaultBob}
        onChange={handleChange('defaultBob')}
      >
        {getCallDropdownValues('Bob')}
      </TextField>
      <TextField
        select
        label="Default Single"
        value={method.defaultSingle}
        onChange={handleChange('defaultSingle')}
      >
        {getCallDropdownValues('Single')}
      </TextField>
      <IconButton onClick={() => dispatch(deleteMethod(method.id))}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

export default EditableMethod;
