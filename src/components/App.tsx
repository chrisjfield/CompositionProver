import * as React from 'react';

import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';

import { generateResults } from '../helpers/compositionHelper';
import store from '../helpers/store';

import { persistStore, PersistorConfig } from 'redux-persist';
import * as localForage from 'localforage';

import { addError } from '../actions/appActions';
import Results from './Results';
import Composition from './Composition';
import Calls from './Calls';
import Methods from './Methods';
import Help from './Help';

const persistConfig: PersistorConfig = {
    blacklist: ['resultReducer'],
    storage: localForage,
};

class App extends React.Component<{}> {

    componentWillMount() {
        persistStore(store, persistConfig);
    }

    calculateResults = () => {
        try {
            generateResults();
        } catch (error) {
            store.dispatch(addError(error));
        }
    }

    render() {
        return (
            <div key="react-app" className="container-fluid compose-app" >
                <Paper zDepth={2}>
                    <Tabs className="tab-wrapper">
                        <Tab label="Compositions" className="tab-compositions">
                            <div className="compose-tab">
                                <Composition />
                            </div>
                        </Tab>
                        <Tab label="Methods" className="tab-methods">
                            <div className="compose-tab">
                                <Methods />
                            </div>
                        </Tab>
                        <Tab label="Calls" className="tab-calls">
                            <div className="compose-tab">
                                <Calls />
                            </div>
                        </Tab>
                        <Tab label="Results" onActive={this.calculateResults} className="tab-results">
                            <div className="compose-tab">
                                <Results />
                            </div>
                        </Tab>
                        <Tab label="Help" className="tab-help">
                            <div className="compose-tab">
                                <Help />
                            </div>
                        </Tab>
                    </Tabs>
                </Paper>
            </div>
        );
    }
}

export default App;
