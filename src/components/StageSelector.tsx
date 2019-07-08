import React, { Dispatch } from 'react';
import { connect } from "react-redux";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { IAppState } from '../redux/reducers/rootReducer';
import getSettingsStage from '../redux/selectors/settingSelectors';
import { ringingStages } from '../defaults/stages';
import { editSettingsStage } from '../redux/actions/actions';
import { IStageSelectorState, ISettingsActionTypes } from '../interfaces/interfaces';

const StageSelector = (props: IStageSelectorState) => {
    const getSelections = () => {
        return ringingStages.map((stage) => (
            <option value={stage.stage} key={stage.stage}>{stage.name}</option>
        ));
    }

    const handleChange = () => (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        props.setStage(Number(event.target.value));
    };

    return (
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">
                Stage
            </InputLabel>
            <Select
                native
                value={props.stage}
                onChange={handleChange()}
                input={
                    <OutlinedInput name="stage" labelWidth={44} id="outlined-age-native-simple" />
                }
            >
                {getSelections()}
            </Select>
        </FormControl>
    )
}

const mapStateToProps = (state: IAppState) => {
    const stage = getSettingsStage(state);
    return { stage };
};

const mapDispatchToProps = (dispatch: Dispatch<ISettingsActionTypes>) => {
    return {
        setStage: (stage: number) => dispatch(editSettingsStage(stage)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StageSelector);
