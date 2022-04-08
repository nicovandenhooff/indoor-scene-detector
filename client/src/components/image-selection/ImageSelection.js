import React from 'react';
import { ImageList, ImageListItem, Box } from '@mui/material';

import airport from '../../assets/images/airport.jpeg'
import bakery from '../../assets/images/bakery.jpeg'
import bar from '../../assets/images/bar.jpeg'
import bedroom from '../../assets/images/bedroom.jpeg'
import kitchen from '../../assets/images/kitchen.jpeg'
import livingroom from '../../assets/images/livingroom.jpeg'
import pantry from '../../assets/images/pantry.jpeg'
import restaurant from '../../assets/images/restaurant.jpeg'
import subway from '../../assets/images/subway.jpeg'
import warehouse from '../../assets/images/warehouse.jpeg'


export const ImageSelection = (handleFileUpload) => {

    const handleSetImage = (e) => {
        console.log(e.target)
        console.log('hi')
        handleFileUpload(e.target)
    }

    return (
        <Box
            sx={{
                maxWidth: '400px',
            }}>
            <ImageList
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr)) !important",
                    gridAutoColumns: "minmax(160px, 1fr)",
                    // selected and (selected + hover) states
                    // '&& .Mui-selected, && .Mui-selected:hover': {
                    // bgcolor: 'red',
                    '&, & .MuiImageListItem-root': {
                        border: 'pink',
                        // },
                    },
                    // hover states
                    '& .MuiImageListItem-root:hover': {
                        bgcolor: 'orange',
                        '&, & .MuiImageListItem-root': {
                            color: 'yellow',
                        },
                    },
                }}
            >
                {itemData.map((item) => (
                    <ImageListItem key={item.img} sx={{ cursor: "pointer" }}>
                        <img
                            src={`${item.src}?w=164&h=164&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                            onClick={handleSetImage}
                        />
                    </ImageListItem>

                ))
                }
            </ImageList>
        </Box>
    );
}

const itemData = [
    {
        src: airport,
        title: 'Airport',
    },
    {
        src: bakery,
        title: 'Bakery',
    }, {
        src: bar,
        title: 'Bar',
    }, {
        src: bedroom,
        title: 'Bedroom',
    }, {
        src: kitchen,
        title: 'Kitchen',
    }, {
        src: livingroom,
        title: 'Living Room',
    }, {
        src: pantry,
        title: 'Pantry',
    }, {
        src: restaurant,
        title: 'Restaurant',
    }, {
        src: subway,
        title: 'Subway',
    }, {
        src: warehouse,
        title: 'Warehouse',
    }
];
