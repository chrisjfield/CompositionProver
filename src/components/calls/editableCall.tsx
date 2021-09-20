import { Stack, Typography } from '@mui/material';
import { EditableCallProps } from '../../types/calls';
import EditableCallField from './editableCallField';

const EditableCall = ({ call }: EditableCallProps) => (
  <Stack
    direction={{ xs: 'column', md: 'row' }}
    spacing={{ xs: 0, md: 3 }}
    justifyContent="center"
    alignItems="center"
  >
    <Typography
      variant="subtitle1"
      gutterBottom
      component="div"
      sx={{ width: '210px', mb: '22px' }}
    >
      {`${call.name} (${call.abbreviation})`}
    </Typography>
    <EditableCallField
      call={call}
      property="leadEndPlaceNotation"
      label="Lead End Notation"
    />
    <EditableCallField
      call={call}
      property="halfLeadPlaceNotation"
      label="Half Lead End Notation"
    />
  </Stack>
);

export default EditableCall;
