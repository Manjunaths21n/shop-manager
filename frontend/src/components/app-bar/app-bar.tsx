import React, { useState, useCallback, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { AppBarMenuItemList, SWAP_DRAWER_POSITION } from './app-bar-constants';
import type { IDrawerState, TToggleDrawer, Anchor } from './app-bar-types';
import { MenuDrawer } from './menu-drawer';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { PageTitle } from '../../pages/home-tails/hose-tails';
import Breadcrumbs from '@mui/material/Breadcrumbs';


export function ButtonAppBar() {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  const toggleDrawer: TToggleDrawer = useCallback((anchor: Anchor, open?: boolean) =>
    navigate("/")
    , []);


  useEffect(() => {
    const getCurrentScreenTitle = () => {
      const currentScreenRoute = pathname.split('/')[pathname.split('/').length - 1];
      if (currentScreenRoute === "show-items") return PageTitle.ITEM_LIST;
      if (currentScreenRoute === "app-items") return PageTitle.ADD_ITEM;
      if (currentScreenRoute === "new-bill") return PageTitle.NEW_BILL;
      if (currentScreenRoute === "customer-dues") return PageTitle.SHOW_DUE_LIST;
      return '';
    }
    setSelectedMenuItem(getCurrentScreenTitle())
  }, [pathname]);
  console.log(selectedMenuItem);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{
            '& .MuiBreadcrumbs-separator': {
              color: 'white' // Change slash color to white
            }
          }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => toggleDrawer(SWAP_DRAWER_POSITION)}
            >
              {selectedMenuItem ?
                <HomeOutlinedIcon fontSize='large' sx={{ fill: 'white' }} /> :
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                  Home - ಮುಖಪುಟ
                </Typography>}

            </IconButton>
            {selectedMenuItem ? <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
              {selectedMenuItem}
            </Typography> : null}
          </Breadcrumbs>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
