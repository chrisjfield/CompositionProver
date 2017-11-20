import * as React from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

import { IStore, ICallProps, ICall } from '../interfaces/Interfaces';
import { updateCalls, addCall, deleteCall } from '../actions/callActions';
import styles from '../styles';

class Calls extends React.Component<ICallProps> {

    generateCallHTML = (call: ICall, index: number) => {
        return (
            <div className={'text-field-call col-lg-4 col-sm-6'} key={call.callSymbol}>
                <span className="text-field-call-label">
                    {call.callName + ' (' + call.callSymbol + ')'} 
                </span>
                <TextField 
                    style={styles.callTextField}
                    hintText="Place Notation" 
                    defaultValue={call.callNotation} 
                    onChange={(event, newValue) => this.handleCallChange(call, newValue)}
                />
                {call.coreCall ? null : this.getDeleteButton(call)}
            </div>
        );
    }

    handleCallChange = (call: ICall, newValue: string) => {
        const updatedCall: ICall = { ...call, callNotation: newValue };

        const updatedCalls = this.props.calls.map((call: ICall) => {
            return call.callSymbol === updatedCall.callSymbol ? updatedCall : call;
        });

        this.props.dispatch(updateCalls(updatedCalls));
    }

    getDeleteButton = (call: ICall) => {
        return (
            <div className="text-field-call-delete" onClick={() => this.deleteCall(call)}>
                x
            </div>
        );
    }

    deleteCall = (call: ICall) => {
        this.props.dispatch(deleteCall(call));
    }

    addCall = () => {
        const maxCall: ICall = this.props.calls.reduce((prev, current) => {
            const currentCallNumber: number = Number(current.callSymbol) ? Number(current.callSymbol) : 0;
            const prevCallNumber: number = Number(prev.callSymbol) ? Number(prev.callSymbol) : 0;

            return (prevCallNumber > currentCallNumber) ? prev : current;
        });
        const maxCallSymbol: string = String(Number(maxCall.callSymbol) ? Number(maxCall.callSymbol) + 1 : 1);
        const newCall: ICall = {
            callSymbol: maxCallSymbol,
            callName: 'other call ' + maxCallSymbol,
        };

        this.props.dispatch(addCall(newCall));
    }
    
    render() {
        return (
            <div>
                <div className="row">
                    {this.props.calls.map((call: ICall, index: number) => this.generateCallHTML(call, index))}
                </div>
                <div className="row call-button">
                    <RaisedButton
                        label="Add Call"
                        labelPosition="after"
                        primary={true}
                        icon={<AddIcon />}
                        onClick={this.addCall}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store: IStore) => {
    return {
        calls: store.callReducer.calls,
    };
};
  
const ConnectedCalls = connect(mapStateToProps)(Calls);
export default ConnectedCalls;
