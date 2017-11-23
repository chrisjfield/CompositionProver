import * as React from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';

import { IStore, IResultProps } from '../interfaces/Interfaces';
import styles from '../styles';

class Results extends React.Component<IResultProps> {

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

    getMusicalChanges = () => {
        return (
            <div className="row">
                <div className="col-sm-4">
                    <span className="text-field-results-label">
                        Queens
                    </span>
                    <TextField 
                        name="queens"
                        style={styles.resultTruthTextField}
                        disabled={true}
                        value={this.props.musicalChanges.queens} 
                    />
                </div>
                <div className="col-sm-4">
                    <span className="text-field-results-label">
                        Tittums
                    </span>
                    <TextField 
                        name="tittums"
                        style={styles.resultTruthTextField}
                        disabled={true}
                        value={this.props.musicalChanges.tittums} 
                    />
                </div>
                <div className="col-sm-4">
                    <span className="text-field-results-label">
                        Rollups (Front)
                    </span>
                    <TextField 
                        name="rollupsf"
                        style={styles.resultTruthTextField}
                        disabled={true}
                        value={this.props.musicalChanges.rollupsFront} 
                    />
                </div>
                <div className="col-sm-4">
                    <span className="text-field-results-label">
                        Rollups (Back)
                    </span>
                    <TextField 
                        name="rollupsb"
                        style={styles.resultTruthTextField}
                        disabled={true}
                        value={this.props.musicalChanges.rollupsBack} 
                    />
                </div>
                <div className="col-sm-4">
                    <span className="text-field-results-label">
                        Little Bells (Front)
                    </span>
                    <TextField 
                        name="littlebellsf"
                        style={styles.resultTruthTextField}
                        disabled={true}
                        value={this.props.musicalChanges.littleBellsFront} 
                    />
                </div>
                <div className="col-sm-4">
                    <span className="text-field-results-label">
                        Little Bells (Back)
                    </span>
                    <TextField 
                        name="littlebellsb"
                        style={styles.resultTruthTextField}
                        disabled={true}
                        value={this.props.musicalChanges.littleBellsBack} 
                    />
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

    getGrid = () => {
        const changesPerColumn: number = 100;
        const rowsArray = this.props.rows;
        const columnArray: string[][][] = [];

        for (let i = 0, len = this.props.numberOfChanges; i < len; i += changesPerColumn) {
            columnArray.push(rowsArray.slice(i , i + changesPerColumn));
        }

        return (
            <div>
                <div key="initial" className="row">
                    <div className="col-lg-2 col-md-3 col-sm-4 grid-header">
                        {this.props.initialChangeString}
                        <hr className="results-hr"/>
                    </div>
                </div>
                <div className="row">
                    {columnArray.map((rows: string[][]) => this.getGridColumns(rows))}
                </div>
            </div>
        );
    }

    getGridColumns = (rows: string[][]) => {
        return (
            <div className="col-lg-2 col-md-3 col-sm-4 grid-column">
                {this.getGridRow(rows)}
            </div>
        );
    }

    getGridRow = (rows: string[][]) => {
        return rows.map((row: string[], index: number) => (
            <div key={index} className="row grid-row">
                {row.map((bell: string) => this.getGridBell(bell, index))}
            </div>
        ));
    }

    getGridBell = (bell: string, rowIndex: number) => {
        return (
            <span key={String(rowIndex) + bell} className={'grid-row-bell grid-row-' + rowIndex + '-' + bell}>
                {bell}
            </span>
        );
    }

    render() {
        return (
            <div className="results-wrapper">
                <div className="row group-heading">
                    <h4>Statistics</h4>
                </div>
                {this.getCompositionStats()}
                <div className="row group-heading">
                    <h4>Music</h4>
                </div>
                {this.getMusicalChanges()}
                <div className="row group-heading">
                    <h4>Section Ends</h4>
                </div>
                {this.getImportantChanges()}
                <div className="row group-heading">
                    <h4>Grid</h4>
                </div>
                {this.getGrid()}
            </div>
        );
    }
}

const mapStateToProps = (store: IStore) => {
    return {
        rows: store.resultReducer.rows,
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
