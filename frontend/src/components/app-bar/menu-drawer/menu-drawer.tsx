import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import type { IAppBarMenuDrawerProps } from './menu-drawer-types';
import type { Anchor } from '../app-bar-types';
import { SWAP_DRAWER_POSITION } from '../app-bar-constants';


export function AppBarMenuDrawer(prop: Readonly<IAppBarMenuDrawerProps>) {
    const { toggleDrawer, state } = prop;



    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: 'auto', top: '75px' }}
            className='Box-1111111111'
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment key={SWAP_DRAWER_POSITION}>
                <Drawer
                    slotProps={{
                        paper: {
                            sx: {
                                top: "75px",
                                height: "calc(100% - 75px)",
                            },
                        },
                    }}
                    ModalProps={{
                        hideBackdrop: true,
                    }}
                    className='Drawer-1111111111'
                    sx={{ top: '75px' }}
                    anchor={SWAP_DRAWER_POSITION}
                    open={state[SWAP_DRAWER_POSITION]}
                    onClose={toggleDrawer(SWAP_DRAWER_POSITION, false)}
                >
                    {list(SWAP_DRAWER_POSITION)}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

