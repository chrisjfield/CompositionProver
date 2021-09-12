import React from 'react';
import '../css/App.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Help from './Help';
import StageSelector from './StageSelector';
import Calls from './Calls';
import Methods from './Methods';
import CompositionSettings from './CompositionSettings';
import Results from './Results';
import { StylesProvider } from '@material-ui/styles';

const App: React.FC = () => {
  const [value, setValue] = React.useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  return (
    <StylesProvider>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="on">
          <Tab label="Compositions" />
          <Tab label="Methods" />
          <Tab label="Calls" />
          <Tab label="Results" />
          <Tab label="Help" />
        </Tabs>
      </AppBar>
      {value === 0 && (<div><CompositionSettings /></div>)}
      {value === 1 && (<div><StageSelector /> <Methods /></div>)}
      {value === 2 && (<div><StageSelector /> <Calls /></div>)}
      {value === 3 && <Results />}
      {value === 4 && <Help />}
    </StylesProvider>
  );
}

export default App;
