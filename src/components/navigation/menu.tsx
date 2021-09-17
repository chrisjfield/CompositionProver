import { ReactNode } from 'react';
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
import ImportIcon from '@mui/icons-material/ArrowUpward';
import ExportIcon from '@mui/icons-material/ArrowDownward';
import { Link } from 'react-router-dom';

const Menu = () => {
  const menuItems: [string, ReactNode][] = [
    ['Composition', <CompositionIcon />],
    ['Methods', <MethodIcon />],
    ['Calls', <CallIcon />],
    ['Results', <ResultIcon />],
    ['Help', <HelpIcon />],
  ];

  return (
    <List>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      {menuItems.map(([text, icon]) => (
        <ListItem button key={text} component={Link} to={`/${text}`}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
      <ListItem button>
        <ListItemIcon>
          <ImportIcon />
        </ListItemIcon>
        <ListItemText primary="Import" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ExportIcon />
        </ListItemIcon>
        <ListItemText primary="Export" />
      </ListItem>
    </List>
  );
};

export default Menu;
