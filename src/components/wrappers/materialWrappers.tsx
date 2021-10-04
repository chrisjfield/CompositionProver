import { TextFieldProps } from '@mui/material';
import MuiTextField from '@mui/material/TextField';

const TextField = ({ children, ...muiProps }: TextFieldProps) => (
  <MuiTextField
    variant="filled"
    size="small"
    margin="dense"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...muiProps}
    helperText={muiProps.helperText || ' '}
  >
    {children}
  </MuiTextField>
);

export default TextField;
