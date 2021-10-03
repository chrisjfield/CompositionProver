import { Switch, Route, Redirect } from 'react-router-dom';
import HomeTab from '../home/homeTab';
import CompositionTab from '../composition/compositionTab';
import CallsTab from '../calls/callsTab';
import HelpTab from '../help/helpTab';

const Routes = () => (
  <Switch>
    <Route exact path="/composition">
      <CompositionTab />
    </Route>
    <Route exact path="/methods">
      <div>methods</div>
    </Route>
    <Route exact path="/calls">
      <CallsTab />
    </Route>
    <Route exact path="/results">
      <div>results</div>
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
