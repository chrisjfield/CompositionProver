import { useContext } from 'react';
import { Stack } from '@mui/material';
import CallContext from '../../context/callContext';
import EditableCallField from './editableCallField';

const CallsTab = () => {
  const { calls } = useContext(CallContext);

  return (
    <div>
      {calls.map((c) => (
        <Stack key={`call_${c.abbreviation}_${c.stage}`} direction="row" spacing={5} justifyContent="center">
          <EditableCallField call={c} property="leadEndPlaceNotation" label="Lead End Notation" />
          <EditableCallField call={c} property="halfLeadPlaceNotation" label="Half Lead End Notation" />
        </Stack>
      ))}
    </div>
  );
};

export default CallsTab;
