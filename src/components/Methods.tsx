import * as React from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

import { IStore, IMethodProps, IMethod } from '../interfaces/Interfaces';
import { addMethod, updateMethods, deleteMethod } from '../actions/methodActions';
import styles from '../styles';

class Methods extends React.Component<IMethodProps> {

    generateMethodHTML = (method: IMethod, index: number) => {
        return (
            <div className={'text-field-method'}  key={method.methodId}>
                <TextField 
                    style={styles.methodNameTextField}
                    hintText="Enter Method Name" 
                    defaultValue={method.methodName} 
                    onChange={(event, newValue) => this.updateMethodName(method, newValue)}
                />
                <TextField 
                    style={styles.methodSymbolTextField}
                    hintText="Enter Method Abbrieviation" 
                    defaultValue={method.methodSymbol} 
                    onChange={(event, newValue) => this.updateMethodSymbol(method, newValue)}
                />
                <TextField 
                    style={styles.methodPlaceNotationTextField}
                    hintText="Enter Method Place Notation" 
                    defaultValue={method.methodPlaceNotation} 
                    onChange={(event, newValue) => this.updateMethodPlaceNotation(method, newValue)}
                />
                {method.coreMethod ? null : this.getDeleteButton(method)}
            </div>
        );
    }

    updateMethodName = (method: IMethod, newValue: string) => {
        const updatedMethod: IMethod = { ...method, methodName: newValue };
        this.updateMethod(updatedMethod);
    }

    updateMethodSymbol = (method: IMethod, newValue: string) => {
        const updatedMethod: IMethod = { ...method, methodSymbol: newValue };
        this.updateMethod(updatedMethod);
    }

    updateMethodPlaceNotation = (method: IMethod, newValue: string) => {
        const updatedMethod: IMethod = { ...method, methodPlaceNotation: newValue };
        this.updateMethod(updatedMethod);
    }

    updateMethod = (updatedMethod: IMethod) => {
        const updatedMethods = this.props.methods.map((method: IMethod) => {
            return method.methodId === updatedMethod.methodId ? updatedMethod : method;
        });

        this.props.dispatch(updateMethods(updatedMethods));
    }

    getDeleteButton = (method: IMethod) => {
        return (
            <div className="text-field-method-delete" onClick={() => this.deleteMethod(method)}>
                x
            </div>
        );
    }

    deleteMethod = (method: IMethod) => {
        this.props.dispatch(deleteMethod(method));
    }

    addMethod = () => {
        const maxMethodId: IMethod = this.props.methods.reduce((prev, current) => {
            return (prev.methodId > current.methodId) ? prev : current;
        });
        const newMethod: IMethod = {
            methodId: maxMethodId.methodId + 1,
        };

        this.props.dispatch(addMethod(newMethod));
    }
    
    render() {
        return (
            <div>
                <div className="row">
                    {this.props.methods.map((method: IMethod, index: number) => this.generateMethodHTML(method, index))}
                </div>
                <div className="row method-button">
                    <RaisedButton
                        label="Add Method"
                        labelPosition="after"
                        primary={true}
                        icon={<AddIcon />}
                        onClick={this.addMethod}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store: IStore) => {
    return {
        methods: store.methodReducer.methods,
    };
};
  
const ConnectedMethods = connect(mapStateToProps)(Methods);
export default ConnectedMethods;
