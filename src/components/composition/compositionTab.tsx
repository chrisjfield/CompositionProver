import { useContext } from 'react';
import {
  Checkbox,
  FormControlLabel,
  Grid, MenuItem,
} from '@mui/material';
import CompositionContext from '../../context/compositionContext';
import { updateComposition } from '../wrappers/compositionContextWrapper';
import Composition from '../../types/compositions/composition';
import MethodContext from '../../context/methodContext';
import { sortMethods, methodValidForStage } from '../../helpers/methodHelper';
import { getCompositionDetail, getCompositionDetailProperty, isValidComposition } from '../../helpers/compositionHelper';
import CallContext from '../../context/callContext';
import CompositionHelpText from './compositionHelpText';
import getTypedValue from '../../helpers/eventHelper';
import TextField from '../wrappers/materialWrappers';
import SettingsContext from '../../context/settingsContext';

const CompositionTab = () => {
  const { settings: { selectedComposition } } = useContext(SettingsContext);
  const { compositions, dispatch } = useContext(CompositionContext);
  const { methods } = useContext(MethodContext);
  const { calls } = useContext(CallContext);
  const composition = compositions[selectedComposition];

  const getDropdownOptions = (array: Array<string | number>) => array.map((item) => (
    <MenuItem key={item.toString()} value={item}>
      {item.toString()}
    </MenuItem>
  ));

  const getMethodDropdownOptions = () => methods
    .filter((m) => m.stage <= composition.numberOfBells)
    .sort((a, b) => sortMethods(a, b))
    .map((method) => (
      <MenuItem key={method.abbreviation} value={method.abbreviation}>
        {method.name}
      </MenuItem>
    ));

  const handleChange = (property: keyof Composition) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedComposition = { ...composition, [property]: getTypedValue(event) };

    if (!methodValidForStage(methods, updatedComposition)) {
      updatedComposition.startingMethod = '';
    }

    dispatch(updateComposition(updatedComposition));
  };

  const validation: string = isValidComposition(calls, methods, composition) ? '' : 'Invalid Full Type Composition';

  return (
    <Grid container>
      <Grid item xs={6}>
        <TextField
          select
          label="Number Of Bells"
          value={composition.numberOfBells}
          onChange={handleChange('numberOfBells')}
        >
          {getDropdownOptions([4, 5, 6, 7, 8, 9, 10, 11, 12])}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          select
          label="Type"
          value={composition.type}
          onChange={handleChange('type')}
        >
          {getDropdownOptions(['Full', 'Numerical', 'Positional'])}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Parts"
          type="number"
          inputProps={{ min: '1', max: '1000' }}
          value={composition.parts}
          onChange={handleChange('parts')}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={(
            <Checkbox
              checked={composition.type !== 'Positional' && composition.halfLead}
              onChange={handleChange('halfLead')}
              value={composition.halfLead}
              disabled={composition.type === 'Positional'}
            />
          )}
          label="Half Leads"
        />
      </Grid>
      {composition.type !== 'Full'
        && (
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Method"
              value={composition.startingMethod}
              onChange={handleChange('startingMethod')}
            >
              {getMethodDropdownOptions()}
            </TextField>
          </Grid>
        )}
      <Grid item xs={12}>
        <TextField
          label="Composition"
          value={getCompositionDetail(composition)}
          onChange={handleChange(getCompositionDetailProperty(composition))}
          error={!!validation}
          helperText={validation}
          multiline
          fullWidth
          rows="8"
          sx={{ height: 'unset' }}
        />
      </Grid>
      <CompositionHelpText compositionType={composition.type} />
    </Grid>
  );
};

export default CompositionTab;
