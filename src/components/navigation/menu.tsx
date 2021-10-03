import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import CallIcon from '@mui/icons-material/RecordVoiceOver';
import ResultIcon from '@mui/icons-material/ViewColumn';
import CompositionIcon from '@mui/icons-material/Audiotrack';
import MethodIcon from '@mui/icons-material/LibraryMusic';
import ImportExportButton from './import_export/importExportButton';

const Menu = () => {
  const menuItems: [string, ReactElement][] = [
    ['Home', <HomeIcon />],
    ['Composition', <CompositionIcon />],
    ['Methods', <MethodIcon />],
    ['Calls', <CallIcon />],
    ['Results', <ResultIcon />],
    ['Help', <HelpIcon />],
  ];

  return (
    <List>
      {menuItems.map(([text, icon]) => (
        <ListItem button key={text} component={Link} to={`/${text}`}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
      <ImportExportButton />
    </List>
  );
};

export default Menu;
