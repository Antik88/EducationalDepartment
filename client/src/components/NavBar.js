import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { ADDEVENT_ROUTE, LOGIN_ROUTE, OFFENSIVE_ROUTE, REPORTS_ROUTE } from '../utils/consts';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SummarizeIcon from '@mui/icons-material/Summarize';
import GavelIcon from '@mui/icons-material/Gavel';
import HouseIcon from '@mui/icons-material/House';
import { observer } from 'mobx-react-lite';

function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  const navigate = useNavigate()

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          {localStorage.getItem('token') ?
            <Button color="inherit" onClick={() => {
              localStorage.clear();
              navigate(LOGIN_ROUTE)
            }
            }>LogOut</Button>
            :
            <Button color="inherit" onClick={() => navigate(LOGIN_ROUTE)}>Login</Button>
          }
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              <HouseIcon />
              <ListItemText primary="Главная страница" />
            </ListItem>
            <ListItem button sx={{ cursor: 'pointer' }} onClick={() => navigate(ADDEVENT_ROUTE)}>
              <AddBoxIcon />
              <ListItemText primary="Добавить меоприятие" />
            </ListItem>
            <ListItem button sx={{ cursor: 'pointer' }} onClick={() => navigate(OFFENSIVE_ROUTE)}>
              <GavelIcon />
              <ListItemText primary="Учет правонарушений" />
            </ListItem>
            <ListItem button sx={{ cursor: 'pointer' }} onClick={() => navigate(REPORTS_ROUTE)}>
              <SummarizeIcon />
              <ListItemText primary="Просмотреть отчеты" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default observer(NavBar)
