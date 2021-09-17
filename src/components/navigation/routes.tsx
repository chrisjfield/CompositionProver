import { Switch, Route } from 'react-router-dom';

const Routes = () => (
  <Switch>
    <Route path="/composition">
      <div>composition</div>
    </Route>
    <Route path="/methods">
      <div>methods</div>
    </Route>
    <Route path="/calls">
      <div>calls</div>
    </Route>
    <Route path="/results">
      <div>results</div>
    </Route>
    <Route path="/help">
      <div>help</div>
    </Route>
    <Route path="/">
      <div>home</div>
    </Route>
  </Switch>
);

export default Routes;
