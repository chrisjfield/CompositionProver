import { BrowserRouter } from 'react-router-dom';
import AppContextWrapper from './wrappers/appContextWrapper';
import AppFrame from './AppFrame/AppFrame';
import Routes from './routes/routes';

const App = () => (
  <AppContextWrapper>
    <BrowserRouter>
      <AppFrame>
        <Routes />
      </AppFrame>
    </BrowserRouter>
  </AppContextWrapper>
);

export default App;
