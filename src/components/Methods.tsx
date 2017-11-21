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
            <div key={method.methodId}>
                <div className={'row text-field-method-wrapper'}>
                    <div className="col-lg-4 col-md-3 col-sm-8 text-field-method">
                        <TextField 
                            style={styles.methodNameTextField}
                            hintText="Name" 
                            value={method.methodName ? method.methodName : ''} 
                            onChange={(event, newValue) => this.updateMethodName(method, newValue)}
                        />
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-3 text-field-method">
                        <TextField 
                            style={styles.methodSymbolTextField}
                            hintText="Code" 
                            value={method.methodSymbol ? method.methodSymbol : ''} 
                            onChange={(event, newValue) => this.updateMethodSymbol(method, newValue)}
                        />
                    </div>
                    <div className="col-lg-6 col-md-7 col-sm-11 text-field-method">
                        <TextField 
                            style={styles.methodPlaceNotationTextField}
                            hintText="Place Notation" 
                            value={method.methodPlaceNotation ? method.methodPlaceNotation : ''}
                            onChange={(event, newValue) => this.updateMethodPlaceNotation(method, newValue)}
                        />
                        {method.coreMethod ? null : this.getDeleteButton(method)}
                    </div>
                </div>
                <hr className="row method-break"/>
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
