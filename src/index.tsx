import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import CircularProgress from '@material-ui/core/CircularProgress';
import store from './redux/store';
import App from './components/App';
import './css/index.css';

const rootElement = document.getElementById('root')

ReactDOM.render(
    <Provider store={store().store}>
        <PersistGate loading={<CircularProgress />} persistor={store().persistor}>
            <App />
        </PersistGate>
    </Provider>,
    rootElement
)