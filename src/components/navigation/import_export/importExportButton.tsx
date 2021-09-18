import { useState } from 'react';
import { Collapse } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ImportButton from './importButton';
import ExportButton from './exportButton';
import ResetButton from './resetButton';

const ImportExportButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <ImportExportIcon />
        </ListItemIcon>
        <ListItemText primary="Import/Export" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ImportButton />
          <ExportButton />
          <ResetButton />
        </List>
      </Collapse>
    </>
  );
};

export default ImportExportButton;
