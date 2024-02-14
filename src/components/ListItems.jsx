import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import TimelapseRoundedIcon from '@mui/icons-material/TimelapseRounded';
import { ListItem } from '@mui/material';

export const mainListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <HomeRoundedIcon color="primary"/>
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SearchRoundedIcon color="primary"/>
      </ListItemIcon>
      <ListItemText primary="Buscar" />
    </ListItemButton>
  </>
);

export const secondaryListItems = (
  <>
    <ListItem>
      <ListItemIcon>
        <StarBorderRoundedIcon color="primary"/>
      </ListItemIcon>
      <ListItemText primary="Mezclas favoritas" />
    </ListItem>
    <ListItemButton>
      <ListItemIcon>
        <TimelapseRoundedIcon color="primary"/>
      </ListItemIcon>
      <ListItemText primary="Mezcla dulce" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <TimelapseRoundedIcon color="primary"/>
      </ListItemIcon>
      <ListItemText primary="Mezcla afrutada" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <TimelapseRoundedIcon color="primary"/>
      </ListItemIcon>
      <ListItemText primary="Mezcla cítrica" />
    </ListItemButton>
  </>
);