import React from 'react';
import { ImageList, ImageListItem, Box } from '@mui/material';


export const ImageSelection = ({ handleFileUpload }) => {

    return (
        <Box>
            <ImageList
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr)) !important",
                    gridAutoColumns: "minmax(160px, 1fr)"
                }}
            >
                {itemData.map((item) => (
                    <ImageListItem key={item.img} sx={{ cursor: "pointer" }}>
                        <img
                            src={`${item.src}`}
                            alt={item.title}
                            loading="lazy"
                            onClick={handleFileUpload}
                            id={item.id}
                            key={item.id}
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
        src: 'assets/images/airport.jpeg',
        title: 'Airport',
        id: 'airport'
    },
    {
        src: 'assets/images/bakery.jpeg',
        title: 'Bakery',
        id: 'bakery'
    }, {
        src: 'assets/images/bar.jpeg',
        title: 'Bar',
        id: 'bar'
    }, {
        src: 'assets/images/bedroom.jpeg',
        title: 'Bedroom',
        id: 'bedroom'
    }, {
        src: 'assets/images/kitchen.jpeg',
        title: 'Kitchen',
        id: 'kitchen'
    }, {
        src: 'assets/images/livingroom.jpeg',
        title: 'Living Room',
        id: 'livingroom'
    }, {
        src: 'assets/images/pantry.jpeg',
        title: 'Pantry',
        id: 'pantry'
    }, {
        src: 'assets/images/restaurant.jpeg',
        title: 'Restaurant',
        id: 'restaurant'
    }, {
        src: 'assets/images/subway.jpeg',
        title: 'Subway',
        id: 'subway'
    }, {
        src: 'assets/images/warehouse.jpeg',
        title: 'Warehouse',
        id: 'warehouse'
    }
];
