import React, { Dispatch } from 'react';
import { connect } from "react-redux";
import { IAppState } from '../redux/reducers/rootReducer';
import { editMethod, addMethod, deleteMethod } from '../redux/actions/actions';
import { IMethodState, IMethodActionTypes, IMethod, IMethodProperty } from '../interfaces/interfaces';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { getMethods } from '../redux/selectors/methodSelectors';
import { getCalls } from '../redux/selectors/callSelectors';
import { Select, OutlinedInput, FormControl, InputLabel, Button, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import getSettingsStage from '../redux/selectors/settingSelectors';

const Methods = (props: IMethodState) => {
    const getCallDropdownValues = (searchString: string) => {
        const filteredCalls = props.calls.filter((call) => 
            call.name.includes(searchString) 
            || call.name.includes('user')
        );

        return filteredCalls.map((call) => (
            <option value={call.abbreviation} key={call.abbreviation}>{call.name}</option>
        ));
    }

    const handleChange = (property: IMethodProperty, method: IMethod) => (
        event: React.ChangeEvent<{ value: unknown}>
    ) => {
        method[property] = String(event.target.value);
        props.editMethod(method);
    };

    const addCustomMethod = () => (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        console.log('test');
        const newMethod: IMethod = {
            name: 'New Custom Method',
            abbreviation: 'ncm' + props.stage.toString(),
            stage: props.stage,
            placeNotation: '',
            defaultBob: 'b',
            defaultSingle: 's',
        }

        props.addMethod(newMethod);
    };

    const getMethodRows = () => {
        return props.methods.map((method) => {
            return (
                <Grid key={method.abbreviation} container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            id="outlined-method-name"
                            label="Name"
                            value={method.name}
                            margin="normal"
                            onChange={handleChange('name', method)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={1}>
                        <TextField
                            id="outlined-method-abbreviation"
                            label="Abbreviation"
                            value={method.abbreviation}
                            margin="normal"
                            onChange={handleChange('abbreviation', method)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={5}>
                        <TextField
                            id="outlined-method-placeNotation"
                            label="Place Notation"
                            value={method.placeNotation}
                            margin="normal"
                            onChange={handleChange('placeNotation', method)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={1}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-age-native-simple">
                                Default Bob
                            </InputLabel>
                            <Select
                                native
                                value={method.defaultBob}
                                onChange={handleChange('defaultBob', method)}
                                input={
                                    <OutlinedInput name="default-bob" labelWidth={88} id="outlined-age-native-simple" />
                                }
                            >
                                {getCallDropdownValues('bob')}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={1}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-age-native-simple">
                                Default Single
                            </InputLabel>
                            <Select
                                native
                                value={method.defaultSingle}
                                onChange={handleChange('defaultSingle', method)}
                                input={
                                    <OutlinedInput name="default-single" labelWidth={104} id="outlined-age-native-simple" />
                                }
                            >
                                {getCallDropdownValues('single')}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={1}>
                        <IconButton aria-label="Delete" onClick={() => (props.deleteMethod(method.abbreviation))}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            )
        })
    }

    return (
        <div>
            {getMethodRows()}
            <Button variant="contained" color="default">
                <AddIcon />
                Lookup
            </Button>
            <Button variant="contained" color="default" onClick={addCustomMethod()}>
                <AddIcon />
                Custom
            </Button>
        </div>        
    )
}

const mapStateToProps = (state: IAppState) => {
    const methods = getMethods(state);
    const calls = getCalls(state);
    const stage = getSettingsStage(state);
    return { methods, calls, stage };
};

const mapDispatchToProps = (dispatch: Dispatch<IMethodActionTypes>) => {
    return {
        addMethod: (method: IMethod) => dispatch(addMethod(method)),
        editMethod: (method: IMethod) => dispatch(editMethod(method)),
        deleteMethod: (abbreviation: string) => dispatch(deleteMethod(abbreviation)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Methods);