import { Switch, Route, Redirect } from 'react-router-dom';
import CallsTab from '../calls/callsTab';

const Routes = () => (
  <Switch>
    <Route exact path="/composition">
      <div>composition</div>
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
      <div>help</div>
    </Route>
    <Route exact path="/">
      <div>home</div>
    </Route>
    <Redirect to="/" />
  </Switch>
);

export default Routes;
