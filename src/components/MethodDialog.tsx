import React, { Dispatch } from 'react';
import { connect } from "react-redux";
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Dialog, DialogTitle, ListItem, ListItemText, CircularProgress, TextField } from "@material-ui/core";
import { addMethod } from '../redux/actions/actions';
import { getMethodListForStage } from '../helpers/methodHelper';
import { usePrevious } from '../helpers/stateHelper';
import { IMethodActionTypes, IMethodDialogState, INewMethod } from '../interfaces/interfaces';
import useStyles from '../styles/styles';

const MethodDialog = (props: IMethodDialogState) => {
    const styles = useStyles();

    const [loading, setLoading] = React.useState(true);
    const [methods, setMethods] = React.useState<INewMethod[]>([]);
    const [filteredMethods, setFilteredMethods] = React.useState<INewMethod[]>([]);
    const prevStage = usePrevious(props.stage);

    const setMethodProps = (methods: INewMethod[]) => {
        methods.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 0);
        setMethods(methods);
        setFilteredMethods(methods);
        setLoading(false);
    }

    const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value.toLowerCase();
        const filteredMethods = methods
            .filter((method) => method.name.toLowerCase().includes(search))
            .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 0);

        setFilteredMethods(filteredMethods);
    }

    const addLookedUpMethod = (method: INewMethod) => (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        props.addMethod(method);
        closeDialog();
    }

    const Row = (rowProps: ListChildComponentProps) => {
        const method: INewMethod = rowProps.data[rowProps.index];

        return (
            <ListItem button onClick={addLookedUpMethod(method)} key={rowProps.index} style={rowProps.style}>
                <ListItemText primary={rowProps.isScrolling ? 'Loading' : method.name} />
            </ListItem>
        );
    }

    const getDiaglogContents = () => {
        if (loading) {
            return (
                <CircularProgress className={styles.loading} />
            )
        } else {
            return (
                <FixedSizeList
                    itemCount={filteredMethods.length}
                    itemSize={50}
                    itemData={filteredMethods}
                    width='100%'
                    height={500}
                    useIsScrolling={true}
                >
                    {Row}
                </FixedSizeList>
            )
        }
    }

    const closeDialog = () => {
        props.onClose();
        setFilteredMethods(methods);
    }

    // if we change stage we need to set back to loading
    (prevStage !== props.stage && !loading) && setLoading(true);

    // if we are loading we need to get methods, only do this when open to avoid confusing app slowdown
    (loading && props.open) && getMethodListForStage(props.stage, setMethodProps);

    return (
        <Dialog
            onClose={closeDialog}
            open={props.open}
            fullWidth={true}
            maxWidth='xs'
            classes={{
                paper: styles.methodDialogPaper,
            }}
        >
            <DialogTitle id="method-dialog-Title" className={styles.methodDialogTitle}>
                Select Method
            </DialogTitle>
            <TextField
                id="method-dialog-search"
                className={styles.methodDialogSearch}
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
        addMethod: (method: INewMethod) => dispatch(addMethod(method)),
    }
}

export default connect(null, mapDispatchToProps)(MethodDialog);