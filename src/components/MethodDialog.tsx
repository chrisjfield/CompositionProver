import React, { Dispatch, useEffect, useRef } from 'react';
import { Dialog, DialogTitle, ListItem, ListItemText, CircularProgress, TextField } from "@material-ui/core";
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

function usePrevious<T>(value: T) {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

const MethodDialog = (props: MethodDialogProps) => {
    console.log(props.stage);
    const [loading, setLoading] = React.useState(true);
    const prevStage = usePrevious(props.stage);
    const [methods, setMethods] = React.useState<IMethod[]>([]);
    const [filteredMethods, setFilteredMethods] = React.useState<IMethod[]>([]);
    const [search, setSearch] = React.useState('');

    if (prevStage !== props.stage && !loading) {
        setLoading(true);
        setMethods([]);
        setFilteredMethods([]);
    }

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

    const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value.toLowerCase();
        const filteredMethods = methods
            .filter((method) => method.name.toLowerCase().includes(search))
            .sort((a, b) => {
                const textA = a.name.toUpperCase();
                const textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

        setSearch(event.target.value);
        setFilteredMethods(filteredMethods);
    }

    return (
        <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.open}>
            <DialogTitle id="simple-dialog-title">Select Method</DialogTitle>
            <TextField
                id="outlined-search"
                label="Search"
                type="search"
                onChange={handleChange()}
                margin="normal"
                variant="outlined"
            />
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