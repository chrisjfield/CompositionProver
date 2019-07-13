import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { MenuItem, TextField } from '@material-ui/core';
import { IAppState } from '../redux/reducers/rootReducer';
import getSettingsStage from '../redux/selectors/settingSelectors';
import { editSettingsStage } from '../redux/actions/actions';
import { IStageSelectorState, ISettingsActionTypes } from '../interfaces/interfaces';
import { ringingStages } from '../defaults/stages';
import useStyles from '../styles/styles';

const StageSelector = (props: IStageSelectorState) => {
    const styles = useStyles();

    const getStageDropdownOptions = () => {
        return ringingStages.map((stage) => (
            <MenuItem key={stage.stage} value={stage.stage}>
                {stage.name}
            </MenuItem>
        ));
    }

    const handleChange = () => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        props.setStage(Number(event.target.value));
    };

    return (
        <TextField
            select
            id='stage-selector-dropdown'
            className={styles.stageDropdown}
            label='Stage'
            value={props.stage}
            onChange={handleChange()}
            margin='normal'
            variant='outlined'
        >
            {getStageDropdownOptions()}
        </TextField>
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
