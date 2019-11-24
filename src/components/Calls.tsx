import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Box, Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { IAppState } from '../redux/reducers/rootReducer';
import { getCalls } from '../redux/selectors/callSelectors';
import { editCall } from '../redux/actions/actions';
import { ICallState, ICallActionTypes, ICall, ICallProperty } from '../interfaces/interfaces';
import { isValidCallNotation } from '../helpers/callHelper';
import useStyles from '../styles/styles';

const Calls = (props: ICallState) => {
    const styles = useStyles();

    const getCallRows = () => {
        return props.calls.map((call) => {
            const callKey = call.abbreviation + String(call.stage);
            const callText = `${call.name} (${call.abbreviation})`;

            return (
                <Grid container item key={callKey} className={styles.callContainer} spacing={1} xs={12} lg={6} xl={4}>
                    <Grid item sm={4} xs={12}>
                        <Box fontWeight='fontWeightMedium' display='inline-flex' className={styles.callText} >
                            {callText}
                        </Box>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        {getCallEditableField(call, 'leadEndPlaceNotation', 'Lead End Notation')}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        {getCallEditableField(call, 'halfLeadPlaceNotation', 'Half Lead Notation')}
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="middle" />
                    </Grid>
                </Grid>
            )
        })
    }

    const getCallEditableField = (call: ICall, property: ICallProperty, label: string) => {
        const validNotation = isValidCallNotation(call.stage, call[property]);

        return (call.editable || call[property])
            ? (<TextField
                disabled={!call.editable}
                error={!validNotation}
                id={`call-field-${property.toString()}`}
                className={styles.callField}
                margin='normal'
                label={label}
                value={call[property]}
                onChange={handleChange(property, call)}
                helperText={!validNotation && 'Invalid place notation'}
            />)
            : null;
    }

    const handleChange = (property: ICallProperty, call: ICall) => (event: React.ChangeEvent<HTMLInputElement>) => {
        call[property] = event.target.value.toUpperCase();
        props.editCall(call);
    };

    return (
        <Grid container>
            {getCallRows()}
        </Grid>
    )
}

const mapStateToProps = (state: IAppState) => {
    const calls = getCalls(state);
    return { calls };
};

const mapDispatchToProps = (dispatch: Dispatch<ICallActionTypes>) => {
    return {
        editCall: (call: ICall) => dispatch(editCall(call)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calls);