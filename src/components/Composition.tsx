import * as React from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { ICompositionProps } from '../interfaces/Interfaces';
import { updateComposition, updatePlaceNotation, updateStage } from '../actions/appActions';
import { ringingStages, IStage } from '../helpers/stagesHelper';

class Composition extends React.Component<ICompositionProps> {

    getStages = () => {
        return ringingStages.map((stage: IStage) => <MenuItem key={stage.numberOfBells} value={stage.numberOfBells} primaryText={stage.stage} />);
    }

    handleCompositionChange = (event: React.FormEvent<HTMLSelectElement>, value: string) => { 
        this.props.dispatch(updateComposition(value));
    }

    handlePlaceNotationChange = (event: React.FormEvent<HTMLSelectElement>, value: string) => { 
        this.props.dispatch(updatePlaceNotation(value)); 
    }

    handleStageChange = (event: any, index: any, value: any) => {
        this.props.dispatch(updateStage(value)); 
    }
    
    render() {
        return (
            <div>
                <div>
                    <SelectField floatingLabelText="Stage" value={this.props.stage} onChange={this.handleStageChange}>
                        {this.getStages()}
                    </SelectField>
                </div>
                <br/>
                <div>
                    <TextField
                        name="placeNotation"
                        hintText="Place Notation"
                        defaultValue={this.props.placeNotation}
                        onChange={this.handlePlaceNotationChange}
                    />
                </div>
                <br/>
                <div>
                    <TextField
                        name="composition"
                        hintText="Composition"
                        defaultValue={this.props.composition}
                        onChange={this.handleCompositionChange}
                        multiLine={true}
                        rows={5}
                    />
                </div>
            </div>
        );
    }
}

export default Composition;
