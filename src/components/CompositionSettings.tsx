import React, { Dispatch } from 'react';
import { connect } from 'react-redux';

import { ICompositionSettingsState, IComposition, ICompositionActionTypes, } from '../interfaces/interfaces';
import useStyles from '../styles/styles';
import { IAppState } from '../redux/reducers/rootReducer';
import { getCurrentComposition } from '../redux/selectors/compositionSelectors';
import { editCurrentComposition } from '../redux/actions/actions';
import { TextField, MenuItem, FormControlLabel, Checkbox, Grid, Container } from '@material-ui/core';

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
                        {getDropdownOptions(['full', 'numerical', 'positional'])}
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
                                checked={props.composition.halfLead}
                                onChange={handleHalfLeadChange('halfLead')}
                                value={props.composition.halfLead}
                                color="primary"
                            />
                        }
                        label="Half Leads"
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state: IAppState) => {
    const composition = getCurrentComposition(state);
    return { composition };
};

const mapDispatchToProps = (dispatch: Dispatch<ICompositionActionTypes>) => {
    return {
        editComposition: (composition: IComposition) => dispatch(editCurrentComposition(composition)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompositionSettings);
