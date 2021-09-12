import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppContextWrapper from './context/appContextWrapper';

ReactDOM.render(
  <StrictMode>
    <AppContextWrapper>
      <App />
    </AppContextWrapper>
  </StrictMode>,
  document.getElementById('root'),
);
