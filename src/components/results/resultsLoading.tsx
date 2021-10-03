import { Typography, CircularProgress } from '@mui/material';

const ResultsLoading = () => (
  <>
    <CircularProgress />
    <Typography>
      Calculating Results...
    </Typography>
  </>
);

export default ResultsLoading;
