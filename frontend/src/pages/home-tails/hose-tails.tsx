import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Icon, IconButton, ListSubheader, Paper, Snackbar } from '@mui/material';
import FormatListNumberedSharpIcon from '@mui/icons-material/FormatListNumberedSharp';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import InfoIcon from '@mui/icons-material/Info';
import * as deviceDetect from 'react-device-detect';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

enum PageTitle {
    ITEM_LIST = 'Item List',
    ADD_ITEM = 'Add List',
    NEW_BILL = 'New Bill',
    SHOW_DUE_LIST = 'Show Due List'
}

const itemData = [
    {
        img: 'https://cdn.24.co.za/files/Cms/General/d/8741/0e0b7973549249ca9dcdb4c0b4179d01.jpg',
        title: PageTitle.ITEM_LIST,
        author: 'Admin',
        disabled: false
    },
    {
        img: 'https://t4.ftcdn.net/jpg/14/10/86/17/240_F_1410861742_cHRUL95nBpKBNpzUuOx8cntUshIWcIFs.jpg',
        title: PageTitle.ADD_ITEM,
        author: 'Admin',
        disabled: false
    },
    {
        img: 'https://t3.ftcdn.net/jpg/00/48/92/94/240_F_48929481_a1nyeajmdul5qkhWZixz7CBV9h0pwMKN.jpg',
        title: PageTitle.NEW_BILL,
        author: 'Admin',
        disabled: true
    },
    {
        img: 'https://t4.ftcdn.net/jpg/13/23/29/85/240_F_1323298567_E4oQkqnEXcvZAM54xln4RqG6W5DNsgQS.jpg',
        title: PageTitle.SHOW_DUE_LIST,
        author: 'User',
        disabled: true
    }
];


export function TitlebarImageList() {
    console.log(deviceDetect);
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = React.useState(false);

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
                sx={{
                    width: '100vw',
                }}
                gap={20}
                cols={deviceDetect.isMobile ? 1 : 2} // Set number of columns
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
                                    title={item.title}
                                    subtitle={item.author}
                                    sx={{
                                        background: item.disabled
                                            ? 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
                                            : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
                                    }}
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
