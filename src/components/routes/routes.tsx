import { Switch, Route, Redirect } from 'react-router-dom';
import CompositionPage from '../../pages/composition';
import MethodsPage from '../../pages/methods';
import CallsPage from '../../pages/calls';
import ResultsPage from '../../pages/results';
import HelpPage from '../../pages/help';
import HomePage from '../../pages/home';

const Routes = () => (
  <Switch>
    <Route exact path="/composition">
      <CompositionPage />
    </Route>
    <Route exact path="/methods">
      <MethodsPage />
    </Route>
    <Route exact path="/calls">
      <CallsPage />
    </Route>
    <Route exact path="/results">
      <ResultsPage />
    </Route>
    <Route exact path="/help">
      <HelpPage />
    </Route>
    <Route exact path="/">
      <HomePage />
    </Route>
    <Redirect to="/" />
  </Switch>
);

export default Routes;
