import React, { useCallback } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

interface IMenuDrawerItem {
    itemName: string;
    index: number;
    isSelected: boolean;
    onItemClick(selectedItem: string): void;
}

export function MenuDrawerItem(prop: Readonly<IMenuDrawerItem>) {
    const { onItemClick, itemName, index, isSelected } = prop;

    const _onItemClick = useCallback(() => {
        onItemClick(itemName);
    }, []);


    return (
        <ListItem key={itemName} disablePadding>
            <ListItemButton
                selected={isSelected}
                onClick={_onItemClick}
                sx={{
                    '&.Mui-selected': {
                        backgroundColor: (theme) => theme.palette.primary.main,
                        color: (theme) => theme.palette.primary.contrastText,
                    },
                    '&.Mui-selected:hover': {
                        backgroundColor: (theme) => theme.palette.primary.dark,
                    },
                    '& .MuiListItemIcon-root': {
                        color: 'inherit', // 🔑 makes the icon follow text color
                    },
                }}
            >
                <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={itemName} />
            </ListItemButton>
        </ListItem >
    );
}

