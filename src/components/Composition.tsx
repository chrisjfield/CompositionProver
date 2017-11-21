import * as React from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { IStore, ICompositionProps, IStageEnum } from '../interfaces/Interfaces';
import { updateComposition, updateParts } from '../actions/compositionActions';
import { setStageDefaults } from '../actions/stageActions';
import { ringingStages } from '../helpers/stagesHelper';

import styles from '../styles';

class Composition extends React.Component<ICompositionProps, {}> {

    handleStageChange = (value: number) => {
        this.props.dispatch(setStageDefaults(value));
    }

    getStages = () => {
        return ringingStages.map((stage: IStageEnum) => {
            return (
                <MenuItem 
                    key={stage.numberOfBells} 
                    value={stage.numberOfBells} 
                    primaryText={stage.stage}
                />
            );
        });
    }

    handlePartsChange = (value: string) => {
        this.props.dispatch(updateParts(Number(value))); 
    }

    handleCompositionChange = (value: string) => { 
        this.props.dispatch(updateComposition(value));
    }
    
    render() {
        return (
            <div className="text-field-composition-wrapper">
                <div className="row">
                    <div className="text-field-composition-label">
                        Stage 
                    </div>
                    <SelectField 
                        value={this.props.stage} 
                        onChange={(event, index, newValue) => this.handleStageChange(newValue)} 
                        style={styles.compositionStageField}
                    >
                        {this.getStages()}
                    </SelectField>
                </div>
                <div className="row">
                    <div className="text-field-composition-label">
                        Number of parts 
                    </div>
                    <TextField 
                        style={styles.compositionStageField}
                        hintText="Parts" 
                        value={this.props.parts} 
                        onChange={(event, newValue) => this.handlePartsChange(newValue)}
                    />
                </div>
                <div className="row composition-multiline-text-field">
                    <TextField
                        style={styles.compositionCompositionField}
                        hintText="Composition"
                        value={this.props.composition}
                        onChange={(event, newValue) => this.handleCompositionChange(newValue)}
                        multiLine={true}
                        rows={3}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store: IStore) => {
    return {
        stage: store.compositionReducer.stage,
        parts: store.compositionReducer.parts,
        composition: store.compositionReducer.composition,
    };
};
  
const ConnectedComposition = connect(mapStateToProps)(Composition);
export default ConnectedComposition;
