import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import type { IAppBarMenuDrawerProps } from './menu-drawer-types';
import type { Anchor } from '../app-bar-types';
import { SWAP_DRAWER_POSITION } from '../app-bar-constants';
import { MenuDrawerItem } from './menu-drawer-item';
import { useParams, useLocation, useNavigate } from 'react-router-dom';


export function MenuDrawer(prop: Readonly<IAppBarMenuDrawerProps>) {
    const { toggleDrawer, state, itemList, selectedItem, setSelectedItem } = prop;

    const params = useParams();
    const location = useLocation();

    const onItemClick = useCallback((menuItem: string) => {
        // toggleDrawer(SWAP_DRAWER_POSITION, true)
        setSelectedItem(menuItem);
    }, []);

    const list = useCallback((anchor: Anchor) => (
        <Box
            sx={{ width: 'auto', top: '75px' }}
            className='Box-1111111111'
        >
            <List>
                {itemList.map((text, index) => (
                    <MenuDrawerItem
                        key={text}
                        index={index}
                        itemName={text}
                        onItemClick={onItemClick}
                        isSelected={text === selectedItem}
                    />
                ))}
            </List>
            {selectedItem}
            <Divider />
        </Box>
    ), []);
    const drawerWidth = 240;
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
                    sx={{
                        top: '75px', width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                    anchor={SWAP_DRAWER_POSITION}
                    variant='persistent'
                    open={state[SWAP_DRAWER_POSITION]}
                    onClose={() => toggleDrawer(SWAP_DRAWER_POSITION, false)}
                >
                    {list(SWAP_DRAWER_POSITION)}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

