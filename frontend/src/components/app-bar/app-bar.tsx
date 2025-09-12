import React, { useState, useCallback, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBarMenuItemList, SWAP_DRAWER_POSITION } from './app-bar-constants';
import type { IDrawerState, TToggleDrawer, Anchor } from './app-bar-types';
import { MenuDrawer } from './menu-drawer';
import { useNavigate } from 'react-router-dom';



export function ButtonAppBar() {

  const navigate = useNavigate();

  const [state, setState] = useState<IDrawerState>({
    top: false,
    left: true,
    bottom: false,
    right: false,
  });
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  const toggleDrawer: TToggleDrawer = useCallback((anchor: Anchor, open?: boolean) =>
    setState(prev => ({ ...prev, [anchor]: open ?? !prev[anchor] }))
    , []);

  const handleSelectedMenuItem = useCallback((value: string) => {
    setSelectedMenuItem(value)
    if (value === "Items") navigate("/");
    if (value === "Add Items") navigate("/app-items");
    if (value === "New Bill") navigate("/new-bill");
    if (value === "Customer Dues") navigate("/customer-dues");
  }, []);

  useEffect(() => {
    selectedMenuItem === '' && handleSelectedMenuItem('Items');
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuDrawer state={state} toggleDrawer={toggleDrawer} itemList={AppBarMenuItemList}
        selectedItem={selectedMenuItem} setSelectedItem={handleSelectedMenuItem} />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleDrawer(SWAP_DRAWER_POSITION)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {selectedMenuItem}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
