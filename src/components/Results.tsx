import * as React from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import { IStore, IResultProps, ILeadResults } from '../interfaces/Interfaces';
import styles from '../styles';
import { getNotationCharacterFromPosition } from '../helpers/placeNotationHelper';

interface IResultState {
    showTreble: boolean;
    showWorkingBell: string;
}

class Results extends React.Component<IResultProps, IResultState> {
    constructor(props: IResultProps) {
        super(props);

        this.state = {
            showTreble: true,
            showWorkingBell: '2',
        };
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
                    {this.getLeadEndChanges(this.props.leads)}
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

    getLeadEndChanges = (lead: ILeadResults[]) => {
        let previousMethod: string = '';

        return lead.map((leadResults: ILeadResults, index: number) => {
            const methodChanged: boolean = previousMethod !== leadResults.method;
            previousMethod = leadResults.method;
            return (
                <div key={index} className="row important-changes-row">
                    <div className="important-changes-leadend-row-method">
                        <b>{methodChanged && (leadResults.method + '  ')}</b>
                    </div>
                    <div className="important-changes-leadend-row-changes">
                        {leadResults.leadEnd}
                    </div>
                    <div className="important-changes-leadend-row-call">
                        <b>{leadResults.call !== 'p' && '  ' + leadResults.call}</b>
                    </div>
                </div>
            );
        });
    }

    getGrid = () => {
        let previousMethod: string = null;
        return (
            <div>
                <div key="initial" className="row">
                    <div className="col-lg-2 col-md-3 col-sm-4 grid-header">
                        {this.props.initialChangeString}
                        <hr className="results-hr"/>
                    </div>
                </div>
                <div key="columns" className="row">
                    {this.props.leads.map((lead: ILeadResults, index: number) => {
                        const methodChanged: boolean = previousMethod !== lead.method;
                        previousMethod = lead.method;
                        
                        return this.getGridColumns(lead, index, methodChanged);
                    })}
                </div>
            </div>
        );
    }

    getGridColumns = (lead: ILeadResults, index: number, methodChanged: boolean) => {
        return (
            <div key={index} className="col-lg-2 col-md-3 col-sm-4 grid-column">
                {this.getGridRow(lead, methodChanged)}
            </div>
        );
    }

    getGridRow = (lead: ILeadResults, methodChanged: boolean) => {
        return lead.rows.map((row: string[], index: number) => (
            <div key={index} className="row grid-row">
                <div className="important-changes-leadend-row-method">
                    <b>{index === 0 && methodChanged && (lead.method + '  ')}</b>
                </div>
                <div className="important-changes-leadend-row-changes">
                    {row.map((bell: string) => this.getGridBell(bell, index))}
                </div>
                <div className="important-changes-leadend-row-call">
                    <b>{index === lead.rows.length - 1 && lead.call !== 'p' && '  ' + lead.call}</b>
                </div>
            </div>
        ));
    }

    getGridBell = (bell: string, rowIndex: number) => {
        const showTreblePath: string = (bell === '1' && this.state.showTreble && this.state.showWorkingBell !== bell) 
            ? ' grid-highlighted-treble' 
            : '';
        const highlightPath: string = (bell === this.state.showWorkingBell) ? ' grid-highlighted-bell' : '';

        return (
            <span key={String(rowIndex) + bell} 
                className={'grid-row-bell grid-row-' + rowIndex + '-' + bell + highlightPath + showTreblePath}>
                {bell}
            </span>
        );
    }

    getGridOptions = () => {
        return (
            <div>
                <div className="row grid-options-first">
                    <div className="col-sm-6">
                        <span className="text-field-results-grid-options-treble">
                            Hightlight Treble Path
                        </span>
                        <div className="grid-toggle">
                            <Toggle 
                                toggled={this.state.showTreble} 
                                onToggle={(event, isInputChecked) => this.toggle(isInputChecked)}/>
                        </div>
                    </div>  
                </div>
                <div className="row grid-options">
                    <div className="col-sm-6">
                        <div className="text-field-results-grid-options-inside">
                            Hightlight Working Bell
                        </div>
                        <div className="grid-selected-bell">
                            <SelectField 
                                value={this.state.showWorkingBell} 
                                onChange={(event, index, newValue) => this.showBell(newValue)} 
                                style={styles.resultWorkingBellField}
                            >
                                <MenuItem key={null} value={null} primaryText={'none'} />
                                {this.getWorkingBells()}
                            </SelectField>
                        </div>
                    </div>  
                </div>
            </div>
        );
    }

    getWorkingBells = () => {
        const bellsArray: string[] = [];
        const numberOfBells: number = this.props.leads[0] && this.props.leads[0].rows[0] ? this.props.leads[0].rows[0].length : 0;

        for (let i = 1; i <= numberOfBells; i += 1) {
            bellsArray.push(getNotationCharacterFromPosition(i));
        }

        return bellsArray.map((bell: string, index: number) => {
            return (
                <MenuItem key={bell} value={bell} primaryText={bell} />
            );
        });
    }

    toggle = (isInputChecked: boolean) => {
        this.setState({
            showTreble: isInputChecked,
        });
    }

    showBell = (bell: string) => {
        this.setState({
            showWorkingBell: bell,
        });
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
                {this.getGridOptions()}
                {this.getGrid()}
            </div>
        );
    }
}

const mapStateToProps = (store: IStore) => {
    return {
        leads: store.resultReducer.leads,
        grid: store.resultReducer.grid,
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
