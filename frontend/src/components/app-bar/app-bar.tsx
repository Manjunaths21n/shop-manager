import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { SWAP_DRAWER_POSITION } from './app-bar-constants';
import type { IDrawerState, TToggleDrawer, Anchor } from './app-bar-types';
import { AppBarMenuDrawer } from './menu-drawer';


export function ButtonAppBar() {

  const [state, setState] = React.useState<IDrawerState>({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer: TToggleDrawer = React.useCallback((anchor: Anchor, open?: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      setState(prev => ({ ...prev, [anchor]: open ?? !prev[anchor] }));
    }, []);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarMenuDrawer state={state} toggleDrawer={toggleDrawer} />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(SWAP_DRAWER_POSITION)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
