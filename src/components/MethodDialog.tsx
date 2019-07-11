import React, { Dispatch } from 'react';
import { Dialog, DialogTitle, ListItem, ListItemText, CircularProgress } from "@material-ui/core";
import { getMethodListForStage } from '../helpers/methodHelper';
import { IMethod, IMethodActionTypes } from '../interfaces/interfaces';
import { FixedSizeList, ListChildComponentProps  } from 'react-window';
import { addMethod } from '../redux/actions/actions';
import { connect } from "react-redux";

export interface MethodDialogProps {
    open: boolean;
    stage: number;
    onClose: () => void;
    addMethod(method: IMethod): void;
}

const MethodDialog = (props: MethodDialogProps) => {
    const [loading, setLoading] = React.useState(true);
    const [methods, setMethods] = React.useState<IMethod[]>([]);
    const [filteredMethods, setFilteredMethods] = React.useState<IMethod[]>([]);

    const setMethodProps = (methods: IMethod[]) => {
        methods.sort((a, b) => {
            const textA = a.name.toUpperCase();
            const textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        setMethods(methods);
        setFilteredMethods(methods);
        setLoading(false);
    }

    (loading && props.open) && getMethodListForStage(props.stage, setMethodProps);
    
    const addLookedUpMethod = (method: IMethod) => (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        props.addMethod(method);
        props.onClose();
    }

    const Row = (rowProps: ListChildComponentProps) => {
        const method = rowProps.data[rowProps.index];
        return (
          <ListItem button onClick={addLookedUpMethod(method)} key={rowProps.index} style={rowProps.style}>
            <ListItemText primary={rowProps.isScrolling ? 'Loading' : method.name} />
          </ListItem>
        );
    }

    const getDiaglogContents = () => {
        if (loading) {
            return (
                <CircularProgress />
            )
        } else {
            return (
                <FixedSizeList
                    height={800}
                    itemCount={filteredMethods.length}
                    itemSize={50}
                    width={500}
                    useIsScrolling={true}
                    itemData={filteredMethods}
                >
                    {Row}
                </FixedSizeList>
            )
        }
    }

    return (
        <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.open}>
            <DialogTitle id="simple-dialog-title">Select Method</DialogTitle>
            {getDiaglogContents()}
        </Dialog>
    );
}

const mapDispatchToProps = (dispatch: Dispatch<IMethodActionTypes>) => {
    return {
        addMethod: (method: IMethod) => dispatch(addMethod(method)),
    }
}

export default connect(null, mapDispatchToProps)(MethodDialog);