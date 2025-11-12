import React, { useState, useCallback, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { SWAP_DRAWER_POSITION } from './app-bar-constants';
import type { TToggleDrawer, Anchor } from './app-bar-types';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { PageTitle } from '../../pages/home-tails/constants';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { Stack } from '@mui/material';
import { languageKeys, useAppContext, type Languages } from '../../context';

export function ButtonAppBar() {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {language, onLanguageChange, translate}=useAppContext();
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
    setSelectedMenuItem(translate(getCurrentScreenTitle()))
  }, [pathname, translate]);


  const handleLanguageChange = (event: SelectChangeEvent) => {
    onLanguageChange(event.target.value as Languages)
  };

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
                  {translate('home')}
                </Typography>}
            </IconButton>
            {selectedMenuItem ? <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
              {selectedMenuItem}
            </Typography> : null}
          </Breadcrumbs>
          <Stack direction="row" spacing={2}>
            <Box sx={{ height: '100%' }}>
              <Typography component={'div'} sx={{ height: '25%' }}>{translate('language')}</Typography>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={language}
                onChange={handleLanguageChange}
                autoWidth
                label="Language"
                sx={{ color: 'white', height: '35px', minWidth: '150px' }}
              >
                <MenuItem value={languageKeys.kn}>ಕನ್ನಡ</MenuItem>
                <MenuItem value={languageKeys.en}>English</MenuItem>
              </Select>
            </Box>
            <Button color="inherit">Login</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
