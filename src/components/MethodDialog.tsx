import React from 'react';
import { Dialog, DialogTitle, ListItem, ListItemText, CircularProgress } from "@material-ui/core";
import { getMethodListForStage } from '../helpers/methodHelper';
import { IMethod } from '../interfaces/interfaces';
import { FixedSizeList, ListChildComponentProps  } from 'react-window';

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
        console.log(methods.length);
    }

    loading && getMethodListForStage(props.stage, setMethodProps);
    
    const Row = (props: ListChildComponentProps) => {
        const method = props.data[props.index];
        console.log(props.index);
        console.log(method);
        return (
          <ListItem button key={props.index}>
            <ListItemText primary={props.isScrolling ? 'Scrolling' : method.name} />
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
                    height={500}
                    itemCount={methods.length}
                    itemSize={35}
                    width={300}
                    useIsScrolling={true}
                    itemData={methods}
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

export default MethodDialog;