import * as React from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';

import { IStore, IResultProps } from '../interfaces/Interfaces';
import styles from '../styles';

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

    getCompositionStats = () => {
        return (
            <div className="row">
                <div className="col-sm-4">
                    <span className="text-field-results-label">
                        Truth
                    </span>
                    <TextField 
                        name="truth"
                        style={styles.resultTruthTextField}
                        disabled={true}
                        value={this.props.truth ? 'True' : 'False'} 
                        inputStyle={this.props.truth ? styles.truthFieldTrue : styles.truthFieldFalse}
                    />
                </div>
                <div className="col-sm-4">
                    <span className="text-field-results-label">
                        Number of Changes
                    </span>
                    <TextField 
                        name="numberOfChanges"
                        style={styles.resultTruthTextField}
                        disabled={true}
                        value={this.props.numberOfChanges} 
                    />
                </div>
                <div className="col-sm-4">
                    <span className="text-field-results-label">
                        Changes of Method
                    </span>
                    <TextField 
                        name="changesOfMethod"
                        style={styles.resultTruthTextField}
                        disabled={true}
                        value={this.props.changesOfMethod} 
                    />
                </div>
            </div>
        );
    }

    getImportantChanges = () => {
        return (
            <div className="row">
                <div className="col-sm-4">
                    <div className="row text-field-changes-label">
                        <h4>Part Ends</h4>
                    </div>
                    <div key="initial" className="row important-changes-row-header">
                        {this.props.initialChangeString}
                    </div>
                    <hr className="results-hr"/>
                    {this.getChanges(this.props.partEnds)}
                </div>
                <div className="col-sm-4">
                    <div className="row text-field-changes-label">
                        <h4>Course Ends</h4>
                    </div>
                    <div key="initial" className="row important-changes-row-header">
                        {this.props.initialChangeString}
                    </div>
                    <hr className="results-hr"/>
                    {this.getChanges(this.props.courseEnds)}
                </div>
                <div className="col-sm-4">
                    <div className="row text-field-changes-label">
                        <h4>Lead Ends</h4>
                    </div>
                    <div key="initial" className="row important-changes-row-header">
                        {this.props.initialChangeString}
                    </div>
                    <hr className="results-hr"/>
                    {this.getChanges(this.props.leadEnds)}
                </div>
            </div>
        );
    }

    getChanges = (rowArray: string[]) => {
        return rowArray.map((row: string, index: number) => (
            <div key={index} className="row important-changes-row">
                {row}
            </div>
        ));
    }

    render() {
        return (
            <div className="results-wrapper">
                {this.getCompositionStats()}
                {this.getImportantChanges()}
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
        initialChangeString: store.resultReducer.initialChangeString,
        musicalChanges: store.resultReducer.musicalChanges,
    };
};
  
const ConnectedResults = connect(mapStateToProps)(Results);
export default ConnectedResults;
