import * as React from 'react';
import Box from '@mui/material/Box';
import { Chip, IconButton, Paper, Snackbar } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import InfoIcon from '@mui/icons-material/Info';
import { isMobile } from 'react-device-detect';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context';
import { PageTitle, itemData } from './constants';

export function TitlebarImageList() {
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = React.useState(false);
    const [isClientMobile, setIsClientMobile] = useState(false);
    const { translate } = useAppContext();

    useEffect(() => {
        // This runs only on client side
        setIsClientMobile(isMobile);
    }, []);

    const handleSelectedMenuItem = useCallback((value: string) => {
        //   setSelectedMenuItem(value)
        if (value === PageTitle.ITEM_LIST) navigate("/show-items");
        if (value === PageTitle.ADD_ITEM) navigate("/app-items");
        if (value === PageTitle.NEW_BILL) navigate("/new-bill");
        if (value === PageTitle.SHOW_DUE_LIST) navigate("/customer-dues");
    }, []);

    return (
        <>
            <ImageList
                sx={{ width: '100vw' }}
                gap={20}
                cols={isClientMobile ? 1 : 2} // Set number of columns
            >
                {itemData.map((item) => (
                    <ImageListItem
                        key={item.img}
                        cols={1} // Each item takes 1 column
                        sx={{
                            height: 'auto', // Auto height for content
                            gridColumnEnd: 'span 1', // Explicitly span 1 column
                            gridRowEnd: 'span 1' // Explicitly span 1 row
                        }}
                    >
                        <Paper
                            elevation={item.disabled ? 2 : 24}
                            sx={{
                                height: '100%', // Take full height of grid cell
                                opacity: item.disabled ? 0.8 : 1,
                                filter: item.disabled ? 'grayscale(21%)' : 'none',
                                pointerEvents: item.disabled ? 'none' : 'auto',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                            onClick={() => item.disabled ? setShowNotification(true) : handleSelectedMenuItem(item.title)}
                        >
                            <Box sx={{ height: '200px', flex: 1 }}>
                                <img
                                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${item.img}?w=248&fit=crop&auto=format`}
                                    alt={item.title}
                                    loading="lazy"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'fill',
                                        filter: item.disabled ? 'blur(1px)' : 'none'
                                    }}
                                />

                                {/* Disabled Overlay */}
                                {item.disabled && (
                                    <Box sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(0,0,0,0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Chip
                                            label="Comming Soon"
                                            color="default"
                                            variant="filled"
                                            size="small"
                                        />
                                    </Box>
                                )}

                                <ImageListItemBar
                                    title={translate(item.title)}
                                    subtitle={item.author}
                                    actionIcon={
                                        <IconButton
                                            sx={{
                                                color: item.disabled ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.54)',
                                                cursor: item.disabled ? 'not-allowed' : 'pointer'
                                            }}
                                            aria-label={`info about ${item.title}`}
                                            disabled={item.disabled}
                                        >
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </Box>
                        </Paper>
                    </ImageListItem>
                ))}
            </ImageList>
            <Snackbar
                open={showNotification}
                slots={{ transition: 'animate' }}
                message="Comming Soon..!"
                key={'SlideTransition'}
                autoHideDuration={2000}
            />
        </>
    );
}

export function HomePageCard() {
    return (
        <>
            <TitlebarImageList />
        </>
    );
}
