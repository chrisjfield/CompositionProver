import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './helpers/store';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './styles/css/app.css';
import App from './components/App';

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root') as HTMLElement,
);
