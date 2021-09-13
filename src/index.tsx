import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppContextWrapper from './components/wrappers/appContextWrapper';

ReactDOM.render(
  <StrictMode>
    <AppContextWrapper>
      <App />
    </AppContextWrapper>
  </StrictMode>,
  document.getElementById('root'),
);
