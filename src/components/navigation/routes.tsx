import { Switch, Route, Redirect } from 'react-router-dom';
import HomeTab from '../home/homeTab';
import CompositionTab from '../composition/compositionTab';
import MethodsTab from '../methods/methodsTab';
import CallsTab from '../calls/callsTab';
import HelpTab from '../help/helpTab';
import ResultsTab from '../results/resultsTab';

const Routes = () => (
  <Switch>
    <Route exact path="/composition">
      <CompositionTab />
    </Route>
    <Route exact path="/methods">
      <MethodsTab />
    </Route>
    <Route exact path="/calls">
      <CallsTab />
    </Route>
    <Route exact path="/results">
      <ResultsTab />
    </Route>
    <Route exact path="/help">
      <HelpTab />
    </Route>
    <Route exact path="/">
      <HomeTab />
    </Route>
    <Redirect to="/" />
  </Switch>
);

export default Routes;
