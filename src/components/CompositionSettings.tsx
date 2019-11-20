import React, { Dispatch } from 'react';
import { connect } from 'react-redux';

import { ICompositionSettingsState, IComposition, ICompositionActionTypes, } from '../interfaces/interfaces';
import useStyles from '../styles/styles';
import { IAppState } from '../redux/reducers/rootReducer';
import { getCalls } from '../redux/selectors/callSelectors';
import { getAllMethods } from '../redux/selectors/methodSelectors';
import { getCurrentComposition } from '../redux/selectors/compositionSelectors';
import { editCurrentComposition } from '../redux/actions/actions';
import { TextField, MenuItem, FormControlLabel, Checkbox, Grid, Container } from '@material-ui/core';
import { isValidFullComposition, isValidNumericalComposition, isValidPositionalComposition } from '../helpers/compositionHelper'

const CompositionSettings = (props: ICompositionSettingsState) => {
    const styles = useStyles();

    const getDropdownOptions = (array: Array<string | number>) => {
        return array.map((item) => (
            <MenuItem key={item.toString()} value={item}>
                {item.toString()}
            </MenuItem>
        ));
    }

    const handleChange = (property: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        props.editComposition({ ...props.composition, [property]: event.target.value });
    };

    const handleHalfLeadChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        props.editComposition({ ...props.composition, [name]: event.target.checked });
    };

    const compositionValidation = (composition: IComposition) => {
        let validation: String = '';

        switch (composition.type) {
            case 'Full':
                !isValidFullComposition(props.calls, props.methods, composition.composition) && (validation = 'Invalid Full Type Composition');
                break;
            case 'Numerical':
                !isValidNumericalComposition(composition.composition) && (validation = 'Invalid Numerical Type Composition');
                break;
            case 'Positional':
                !isValidPositionalComposition(composition.composition) && (validation = 'Invalid Positional Type Composition');
                break;
        }

        return validation;
    }

    const validation = compositionValidation(props.composition);
    const error = validation ? true : false;

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
                <Grid item xs={12}>
                    <TextField
                        id='composition-composition-text'
                        className={styles.compositionCompositionField}
                        label='Composition'
                        value={props.composition.composition}
                        onChange={handleChange('composition')}
                        error={error}
                        helperText={validation}
                        multiline
                        fullWidth
                        rows="8"
                        margin="normal"
                        variant="outlined"
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state: IAppState) => {
    const composition = getCurrentComposition(state);
    const methods = getAllMethods(state);;
    const calls = getCalls(state);
    return { composition, methods, calls };
};

const mapDispatchToProps = (dispatch: Dispatch<ICompositionActionTypes>) => {
    return {
        editComposition: (composition: IComposition) => dispatch(editCurrentComposition(composition)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompositionSettings);
