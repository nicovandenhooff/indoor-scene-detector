import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import UploadIcon from '@mui/icons-material/Upload';

export const FileUploader = ({ handleFileUpload }) => {
    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    return (
        <Box sx={{ mb: 4, alignSelf: 'center' }}>
            <Button onClick={handleClick} variant="outlined" color="secondary">
                <UploadIcon sx={{ mr: 1 }} />
                <Typography
                    variant="body"
                    noWrap
                >
                    Upload an image
                </Typography>
            </Button>
            <input type="file"
                ref={hiddenFileInput}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                accept=".jpeg, .png, .jpg"
            />
        </Box>
    );
};





// export const FileUploader = ({ handleFileUpload }) => {


//     const hiddenFileInput = React.useRef(null);

//     const handleClick = event => {
//         hiddenFileInput.current.click();
//         handleFileUpload(event)
//     };

//     const handleChange = event => {
//         handleFileUpload(event)
//     };

//     return (
//         <Box sx={{ mt: 2, mb: 2, alignSelf: 'center' }}>
//             <input
//                 style={{ display: 'none' }}
//                 id="raised-button-file"
//                 multiple
//                 type="file"
//                 accept=".jpeg, .png, .jpg"
//                 name="myFile"
//                 label="Image"
//                 onChange={handleFileUpload}
//                 ref={hiddenFileInput}
//             />
//             <label htmlFor="raised-button-file">
//                 <Button onClick={handleClick} variant="outlined" component="span" color="secondary" >
//                     <UploadIcon sx={{ mr: 1 }} />
//                     Upload
//                 </Button>
//             </label>
//         </Box>
//     );
// }
