import { TextField } from '@mui/material';
import { useContext } from 'react';
import CallContext from '../../context/callContext';
import { updateCall } from '../wrappers/callContextWrapper';
import { EditableCallFieldProps } from '../../types/calls';
import { isValidCallNotation } from '../../helpers/callHelper';

const EditableCallField = ({ call, property, label }: EditableCallFieldProps) => {
  const { dispatch } = useContext(CallContext);
  const validNotation = isValidCallNotation(call.stage, call[property]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.toUpperCase();
    dispatch(updateCall({ ...call, [property]: newValue }));
  };

  return (
    <TextField
      id={call.abbreviation}
      variant="filled"
      size="small"
      margin="dense"
      disabled={!call.editable}
      error={!validNotation}
      label={label}
      value={call[property] || ''}
      onChange={handleChange}
      helperText={!validNotation && 'Invalid place notation'}
      sx={{ height: '71px', mt: 0 }}
    />
  );
};

export default EditableCallField;
