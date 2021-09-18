import { useState } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { AlertProvider } from '../../context/alertContext';
import { ContextWrapperProps } from '../../types/context';
import Alert from '../../types/alert/index';

const offState: Alert = { visible: false };

const AlertContextWrapper = ({ children }: ContextWrapperProps) => {
  const [error, setError] = useState<Alert>(offState);
  const [success, setSuccess] = useState<Alert>(offState);

  const showError = (text: string) => setError({ visible: true, text });
  const showSuccess = (text: string) => setSuccess({ visible: true, text });

  const showAppError = (
    <Snackbar open={error.visible} autoHideDuration={5000} onClose={() => setError(offState)}>
      <MuiAlert severity="error" variant="filled" onClose={() => setError(offState)}>
        {error.text}
      </MuiAlert>
    </Snackbar>
  );

  const showAppSuccess = (
    <Snackbar open={success.visible} autoHideDuration={5000} onClose={() => setSuccess(offState)}>
      <MuiAlert severity="success" variant="filled" onClose={() => setSuccess(offState)}>
        {success.text}
      </MuiAlert>
    </Snackbar>
  );

  return (
    <AlertProvider value={{ showError, showSuccess }}>
      {showAppError}
      {showAppSuccess}
      {children}
    </AlertProvider>
  );
};

export default AlertContextWrapper;
