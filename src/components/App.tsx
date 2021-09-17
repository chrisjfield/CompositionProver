import { BrowserRouter } from 'react-router-dom';
import AppContextWrapper from './wrappers/appContextWrapper';
import Nav from './navigation/nav';
import Routes from './navigation/routes';

const App = () => (
  <AppContextWrapper>
    <BrowserRouter>
      <Nav>
        <Routes />
      </Nav>
    </BrowserRouter>
  </AppContextWrapper>
);

export default App;
