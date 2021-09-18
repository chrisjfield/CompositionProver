import { BrowserRouter } from 'react-router-dom';
import AppContextWrapper from './wrappers/appContextWrapper';
import Nav from './navigation/nav';

const App = () => (
  <AppContextWrapper>
    <BrowserRouter>
      <Nav />
    </BrowserRouter>
  </AppContextWrapper>
);

export default App;
