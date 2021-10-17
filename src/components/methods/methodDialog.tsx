import { useState, useEffect, useContext } from 'react';
import {
  CircularProgress, Dialog, DialogTitle, ListItem, ListItemText,
} from '@mui/material';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import NewMethod from '../../types/methods/newMethod';
import { MethodDialogProps } from '../../types/methods';
import TextField from '../wrappers/materialWrappers';
import { getMethodListForStage } from '../../helpers/methodHelper';
import MethodContext from '../../context/methodContext';
import { lookupMethod } from '../wrappers/methodContextWrapper';

const MethodDialog = ({ stage, open, onClose }: MethodDialogProps) => {
  const { dispatch } = useContext(MethodContext);

  const [loading, setLoading] = useState(true);
  const [methods, setMethods] = useState<NewMethod[]>([]);
  const [filteredMethods, setFilteredMethods] = useState<NewMethod[]>([]);

  useEffect(() => {
    if (!loading) { setLoading(true); }
  }, [stage]);

  const setMethodProps = (loadedMethods: NewMethod[]) => {
    loadedMethods.sort((a, b) => ((a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 0));
    setMethods(loadedMethods);
    setFilteredMethods(loadedMethods);
    setLoading(false);
  };

  useEffect(() => {
    if (!open) { return; }
    if (!loading) { setFilteredMethods(() => methods); return; }
    // do this on a set timeout to allow the main thread long enough to render the loading page.
    setTimeout(() => {
      const methodsList = getMethodListForStage(stage);
      setMethodProps(methodsList);
    }, 100);
  }, [open]);

  const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.toLowerCase();
    const filterMethods = methods
      .filter(({ name }) => name.toLowerCase().includes(search))
      .sort((a, b) => ((a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 0));

    setFilteredMethods(filterMethods);
  };

  const addLookedUpMethod = (method: NewMethod) => {
    dispatch(lookupMethod(method));
    onClose();
  };

  const methodLookup = ({ index, isScrolling, style }: ListChildComponentProps) => {
    const newMethod: NewMethod = filteredMethods[index];
    return (
      <ListItem style={style} button onClick={() => addLookedUpMethod(newMethod)} key={index}>
        <ListItemText primary={isScrolling ? 'Loading' : newMethod.name} />
      </ListItem>
    );
  };

  const getDiaglogContents = () => (loading
    ? <CircularProgress />
    : (
      <FixedSizeList
        itemCount={filteredMethods.length}
        width="100%"
        height={500}
        itemSize={50}
        useIsScrolling
      >
        {methodLookup}
      </FixedSizeList>
    ));

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        Select Method
      </DialogTitle>
      <TextField
        label="Search"
        type="search"
        onChange={handleChange()}
        margin="normal"
        variant="outlined"
      />
      {getDiaglogContents()}
    </Dialog>
  );
};

export default MethodDialog;
