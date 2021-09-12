import React, { Dispatch } from 'react';
import { connect } from 'react-redux';

import { ICompositionSettingsState, IComposition, ICompositionActionTypes, } from '../interfaces/interfaces';
import useStyles from '../styles/styles';
import { IAppState } from '../redux/reducers/rootReducer';
import { getCalls } from '../redux/selectors/callSelectors';
import { getCompositionMethods } from '../redux/selectors/methodSelectors';
import { getCurrentComposition } from '../redux/selectors/compositionSelectors';
import { editCurrentComposition } from '../redux/actions/actions';
import { TextField, MenuItem, FormControlLabel, Checkbox, Grid, Container, Typography } from '@material-ui/core';
import { isValidComposition } from '../helpers/compositionHelper'
import { sortMethods } from '../helpers/methodHelper';
import Import from './Import';

const CompositionSettings = (props: ICompositionSettingsState) => {
    const styles = useStyles();

    const getDropdownOptions = (array: Array<string | number>) => {
        return array.map((item) => (
            <MenuItem key={item.toString()} value={item}>
                {item.toString()}
            </MenuItem>
        ));
    }

    const getMethodDropdownOptions = () => {
        return props.methods.sort((a, b) => sortMethods(a, b)).map((method) => (
            <MenuItem key={method.abbreviation} value={method.abbreviation}>
                {method.name}
            </MenuItem>
        ));
    }

    const handleChange = (property: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: string | number = event.target.value
        if (event.target.type === 'number') {
            value = parseInt(value) ? parseInt(value) : 1;
        }

        props.editComposition({ ...props.composition, [property]: value });
    };

    const handleHalfLeadChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        props.editComposition({ ...props.composition, [name]: event.target.checked });
    };

    const compositionValidation = (composition: IComposition) => {
        let validation: string = '';

        !isValidComposition(props.calls, props.methods, composition) && (validation = 'Invalid Full Type Composition');

        return validation;
    }

    const getCompositionHelperText = () => {
        switch (props.composition.type) {
            case 'Full':
                return (
                    <Typography component={'span'} className={styles.HelperText}>
                        <br />
                        In this composition mode enter every lead seperated by '.'s. <br />
                        Each element must start with the method abbreviation and finish with the call abbreviation (use p for plain leads). <br />
                        For example: <b>pb6p.pb6p.pb6p.pb6p.pb6b</b> as a 3 part would be a 180 of Bob Minor.
                    </Typography>
                );
            case 'Numerical':
                return (
                    <Typography component={'span'} className={styles.HelperText}>
                        <br />
                        In this composition mode enter every call position numerically seperated by '.'s. <br />
                        Each element may start with the call abbreviation (a bob will be assumed) and must end with the lead number in the course. <br />
                        For example: <b>1.s5</b> as a 2 part would be a 131 of Bob Minor coming round a lead after the second part.
                    </Typography>
                );
            case 'Positional':
                return (
                    <Typography component={'span'} className={styles.HelperText}>
                        <br />
                        In this composition mode enter every call position by notation seperated by '.'s. <br />
                        Each element may start with a number if the call is repeated, it may then contain the call abbreviation (a bob will be assumed) and must end with the calling position. <br />
                        For example: <b>2H.2W.2H.sW</b> as a 1 part would be the standard 1250 of Yorkshire Major.
                    </Typography>
                );;
            default:
                return '';
        }
    }

    const methodNotSet = props.composition.type !== 'Full' && !props.composition.startingMethod;
    const validation = compositionValidation(props.composition);
    const error = validation && !methodNotSet ? true : false;

    return (
        <Container className={styles.compositionContainer}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        select
                        id='composition-numberOfBells-dropdown'
                        className={styles.compositionSettingField}
                        label='Number Of Bells'
                        value={props.composition.numberOfBells}
                        onChange={handleChange('numberOfBells')}
                        margin='normal'
                        variant='outlined'
                    >
                        {getDropdownOptions([4, 5, 6, 7, 8, 9, 10, 11, 12])}
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        select
                        id='composition-type-dropdown'
                        className={styles.compositionSettingField}
                        label='Type'
                        value={props.composition.type}
                        onChange={handleChange('type')}
                        margin='normal'
                        variant='outlined'
                    >
                        {getDropdownOptions(['Full', 'Numerical', 'Positional'])}
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id='composition-parts-dropdown'
                        className={styles.compositionSettingField}
                        label='Parts'
                        type='number'
                        inputProps={{ min: '1', max: "1000" }}
                        value={props.composition.parts}
                        onChange={handleChange('parts')}
                        margin='normal'
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControlLabel
                        className={styles.compositionCheckbox}
                        control={
                            <Checkbox
                                checked={props.composition.type !== 'Positional' && props.composition.halfLead}
                                onChange={handleHalfLeadChange('halfLead')}
                                value={props.composition.halfLead}
                                disabled={props.composition.type === 'Positional'}
                                color="primary"
                            />
                        }
                        label="Half Leads"
                    />
                </Grid>
                {props.composition.type !== 'Full' &&
                    (<Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
                            id='composition-method-dropdown'
                            className={styles.compositionMethodField}
                            label='Method'
                            value={props.composition.startingMethod}
                            onChange={handleChange('startingMethod')}
                            margin='normal'
                            variant='outlined'
                        >
                            {getMethodDropdownOptions()}
                        </TextField>
                    </Grid>)
                }
                <Grid item xs={12}>
                    <TextField
                        id='composition-composition-text'
                        className={styles.compositionCompositionField}
                        label='Composition'
                        value={props.composition.composition}
                        onChange={handleChange('composition')}
                        error={error}
                        helperText={methodNotSet ? 'Please choose a method' : validation}
                        disabled={methodNotSet}
                        multiline
                        fullWidth
                        rows="8"
                        margin="normal"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography component={'span'} className={styles.HelperText}>
                        {getCompositionHelperText()}
                        <br /><br />
                        Repeated sections can be pre-defined for ease in all modes by a line in the form: <b>Part=...;</b> where ... is valid composition notation.<br />
                        You may use previous definitions in future ones.<br />
                        For example the following would be a valid (but verbose!) re-writing of the Yorkshire composition in Positional notation:<br />
                        <b>part1=2H;</b><br />
                        <b>part2=2W;</b><br />
                        <b>part3=part1.sW;</b><br />
                        <b>part1.part2.part3</b>
                        <br /><br />
                        See the help tab for more information.
                    </Typography>
                </Grid>
                <Import />
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state: IAppState) => {
    const composition = getCurrentComposition(state);
    const methods = getCompositionMethods(state);;
    const calls = getCalls(state);
    return { composition, methods, calls };
};

const mapDispatchToProps = (dispatch: Dispatch<ICompositionActionTypes>) => {
    return {
        editComposition: (composition: IComposition) => dispatch(editCurrentComposition(composition)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompositionSettings);
