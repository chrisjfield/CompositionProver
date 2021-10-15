import { Stack, Typography, Grid } from '@mui/material';
import ResultProps from '../../types/results/resultProps';
import TextField from '../wrappers/materialWrappers';

const ResultsMusic = ({ result: { musicalChanges } }: ResultProps) => (
  <Grid>
    <Typography variant="subtitle1">
      <u>Music</u>
    </Typography>
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 0, md: 3 }}
      alignItems="center"
    >
      <TextField
        InputProps={{ readOnly: true }}
        label="Queens"
        value={musicalChanges.queens}
      />
      <TextField
        InputProps={{ readOnly: true }}
        label="Titums"
        value={musicalChanges.tittums}
      />
      <TextField
        InputProps={{ readOnly: true }}
        label="Rollups (Front)"
        value={musicalChanges.rollupsFront}
      />
      <TextField
        InputProps={{ readOnly: true }}
        label="Rollups (Back)"
        value={musicalChanges.rollupsBack}
      />
      <TextField
        InputProps={{ readOnly: true }}
        label="Little Bells (Front)"
        value={musicalChanges.littleBellsFront}
      />
      <TextField
        InputProps={{ readOnly: true }}
        label="Little Bells (Back)"
        value={musicalChanges.littleBellsBack}
      />
    </Stack>
  </Grid>
);

export default ResultsMusic;
