import React from 'react';
import { Dialog, DialogTitle, List, ListItem, ListItemText, CircularProgress } from "@material-ui/core";
import { getMethodListForStage } from '../helpers/methodHelper';
import { IMethod } from '../interfaces/interfaces';

export interface MethodDialogProps {
    open: boolean;
    stage: number;
    onClose: () => void;
}

const MethodDialog = (props: MethodDialogProps) => {
    const [loading, setLoading] = React.useState(true);
    const [methods, setMethods] = React.useState<IMethod[]>([]);

    const setMethodProps = (methods: IMethod[]) => {
        setMethods(methods);
        setLoading(false);
    }

    loading && getMethodListForStage(props.stage, setMethodProps);
    
    const getListItems = () => {
        return methods.map((method) => {
            return (
                <ListItem button onClick={() => console.log(method.name)}>
                    <ListItemText primary={method.name} />
                </ListItem>
            )
        })
    }

    const getDiaglogContents = () => {
        if (loading) {
            return (
                <CircularProgress />
            )
        } else {
            return (
                <List>
                    {getListItems()}
                    <ListItem button onClick={() => console.log('test')}>
                        <ListItemText primary="Method test" />
                    </ListItem>
                </List>
            )
        }
    }

    return (
        <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.open}>
            <DialogTitle id="simple-dialog-title">Select Method</DialogTitle>
            {getDiaglogContents}
        </Dialog>
    );
}

export default MethodDialog;