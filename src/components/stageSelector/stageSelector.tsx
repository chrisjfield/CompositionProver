import { useContext } from 'react';
import { MenuItem } from '@mui/material';
import ringingStages from '../../defaults/stages';
import SettingsContext from '../../context/settingsContext';
import { updateSettings } from '../wrappers/settingsContextWrapper';
import TextField from '../wrappers/materialWrappers';

const StageSelector = () => {
  const { settings, dispatch } = useContext(SettingsContext);

  const getStageDropdownOptions = () => ringingStages.map((stage) => (
    <MenuItem key={stage.stage} value={stage.stage}>
      {stage.name}
    </MenuItem>
  ));

  const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSettings({ ...settings, methodStage: Number(event.target.value) }));
  };

  return (
    <TextField
      select
      label="Stage"
      value={settings.methodStage}
      onChange={handleChange()}
    >
      {getStageDropdownOptions()}
    </TextField>
  );
};

export default StageSelector;
