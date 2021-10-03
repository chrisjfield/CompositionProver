import { TextFieldProps } from '@mui/material';
import MuiTextField from '@mui/material/TextField';

const TextField = ({ children, ...muiProps }: TextFieldProps) => (
  <MuiTextField
    variant="filled"
    size="small"
    margin="dense"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...muiProps}
    sx={{ height: '71px', mt: 0, ...muiProps.sx }}
  >
    {children}
  </MuiTextField>
);

export default TextField;
