import * as React from 'react';
import { connect } from 'react-redux';

import { IStore, IResultProps } from '../interfaces/Interfaces';

class Results extends React.Component<IResultProps> {

    displayRows = () => {
        return this.props.grid.map((row: string, index: number) => (
            <div key={index}>{String(index) + ' - ' + row}</div>
        ));
    }

    displayLeadEnds = () => {
        return this.props.leadEnds.map((leadEnd: string, index: number) => (
            <div key={index}>{String(index + 1) + ' - ' + leadEnd}</div>
        ));
    }
    
    displayTruth = () => {
        return this.props.truth ? 'True' : 'False';
    }

    render() {
        return (
            <div>
                {this.props.grid.length > 1 ? this.displayTruth() : null} 
                <br/>
                {this.props.grid.length > 1 ? this.displayRows() : null}
                <br/>
                {this.props.grid.length > 1 ? this.displayLeadEnds() : null}
            </div>
        );
    }
}

const mapStateToProps = (store: IStore) => {
    return {
        grid: store.resultReducer.grid,
        leadEnds: store.resultReducer.leadEnds,
        courseEnds: store.resultReducer.courseEnds,
        partEnds: store.resultReducer.partEnds,
        numberOfChanges: store.resultReducer.numberOfChanges,
        changesOfMethod: store.resultReducer.changesOfMethod,
        truth: store.resultReducer.truth,
    };
};
  
const ConnectedResults = connect(mapStateToProps)(Results);
export default ConnectedResults;
