import React, { Dispatch } from 'react';
import { connect } from "react-redux";
import { IAppState } from '../redux/reducers/rootReducer';
import { getCalls } from '../redux/selectors/callSelectors';
import { editCall } from '../redux/actions/actions';
import { ICallState, ICallActionTypes, ICall } from '../interfaces/interfaces';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { isValidCallNotation } from '../helpers/callHelper';

const Calls = (props: ICallState) => {
    const getCallRows = () => {
        return props.calls.map((call) => {
            return (
                <Grid key={call.abbreviation} item xs={12} md={6} lg={4}>
                    <Paper>
                        {`${call.name} (${call.abbreviation})`}
                        {getLeadEndField(call)}
                        {getHalfEndField(call)}
                    </Paper>
                </Grid>
            )
        })
    }

    const getLeadEndField = (call: ICall) => {
        return (
            <TextField
                disabled={!call.editable}
                id="outlined-leadend"
                label="Lead End Notation"
                value={call.leadEndPlaceNotation ? call.leadEndPlaceNotation : ''}
                margin="normal"
                variant="outlined"
                onChange={call.editable ? handleLeadEndChange(call) : undefined}
            />
        )
    }

    const getHalfEndField = (call: ICall) => {
        return (call.editable || call.halfLeadPlaceNotation) && (
            <TextField
                disabled={!call.editable}
                id="outlined-halflead"
                label="Half Lead Notation"
                value={call.halfLeadPlaceNotation ? call.halfLeadPlaceNotation : ''}
                margin="normal"
                variant="outlined"
                onChange={call.editable ? handleHalfLeadChange(call) : undefined}
            />
        )
    }

    const handleHalfLeadChange = (call: ICall) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isValidCallNotation(call.stage, event.target.value)) {
            call.halfLeadPlaceNotation = event.target.value;
            props.editCall(call);
        }
    };

    const handleLeadEndChange = (call: ICall) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isValidCallNotation(call.stage, event.target.value)) {
            call.leadEndPlaceNotation = event.target.value;
            props.editCall(call);
        }
    };

    return (
        <Grid container spacing={3}>
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