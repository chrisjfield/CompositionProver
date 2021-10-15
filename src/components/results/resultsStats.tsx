import { Stack, Typography, Grid } from '@mui/material';
import ResultProps from '../../types/results/resultProps';
import TextField from '../wrappers/materialWrappers';

const ResultsStats = ({ result: { truth, numberOfChanges, changesOfMethod } }: ResultProps) => (
  <Grid>
    <Typography variant="subtitle1">
      <u>Statistics</u>
    </Typography>
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 0, md: 3 }}
      alignItems="center"
    >
      <TextField
        InputProps={{ readOnly: true }}
        label="Truth"
        value={truth.true ? 'True' : 'False'}
        helperText={truth.comesRound ? 'comes round' : 'Does not come round'}
      />
      <TextField
        InputProps={{ readOnly: true }}
        label="Number of Changes"
        value={numberOfChanges}
      />
      <TextField
        InputProps={{ readOnly: true }}
        label="Changes of Method"
        value={changesOfMethod}
      />
    </Stack>
  </Grid>
);

export default ResultsStats;
