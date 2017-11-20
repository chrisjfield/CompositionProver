import * as React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';

import { IAppProps, IStore } from '../interfaces/Interfaces';
import { generateRows } from '../helpers/compositionHelper';

import Results from './Results';
import Composition from './Composition';
import Calls from './Calls';
import Methods from './Methods';

class App extends React.Component<IAppProps> {

    compose = () => {
        generateRows(this.props.dispatch, this.props.composition, this.props.stage, this.props.placeNotation, this.props.initialChange,
                     this.props.bob, this.props.extreme, this.props.single);
    }

    render() {
        return (
            <div key="react-app" className="container-fluid compose-app" >
                <Paper zDepth={2}>
                    <Tabs>
                        <Tab label="Composition" >
                            <div className="compose-tab">
                                <Composition dispatch={this.props.dispatch} composition={this.props.composition} 
                                            placeNotation={this.props.placeNotation} stage={this.props.stage}/>
                            </div>
                        </Tab>
                        <Tab label="Methods" >
                            <div className="compose-tab">
                                <Methods />
                            </div>
                        </Tab>
                        <Tab label="Calls" >
                            <div className="compose-tab">
                                <Calls />
                            </div>
                        </Tab>
                        <Tab label="Results" onActive={this.compose}>
                            <div className="compose-tab">
                                <Results leadEnds={this.props.leadEnds} rows={this.props.rows} truth={this.props.truth}/>
                            </div>
                        </Tab>
                    </Tabs>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (store: IStore) => {
    return {
        bob: store.appReducer.bob,
        single: store.appReducer.single,
        extreme: store.appReducer.extreme,
        composition: store.appReducer.composition,
        rows: store.appReducer.rows,
        initialChange: store.appReducer.initialChange,
        placeNotation: store.appReducer.placeNotation,
        stage: store.appReducer.stage,
        leadEnds: store.appReducer.leadEnds,
        truth: store.appReducer.truth,
    };
};
  
const ConnectedApp = connect(mapStateToProps)(App);
export default ConnectedApp;
