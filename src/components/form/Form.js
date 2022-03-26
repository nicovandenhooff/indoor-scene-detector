import React from "react"
import ImageUploader from "react-images-upload";

import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import "./Form.css"

export const Form = ({ handleSubmit, setImage, setNetwork }) => {

    return (
        <FormControl className="form">
            <ImageUploader
                className="image-uploader"
                name="image"
                withIcon={true}
                buttonText="Upload Image"
                buttonClassName="upload-button"
                onChange={setImage}
                imgExtension={[".jpg", ".png"]}
                maxFileSize={5242880} />
            Select a network:
            <RadioGroup
                aria-labelledby="network-label"
                defaultValue="alexnet"
                name="network"
                onChange={setNetwork}
                className="radio-group"
            >
                <FormControlLabel value="alexnet" control={<Radio />} label="AlexNet" />
                <FormControlLabel value="densenet" control={<Radio />} label="DenseNet" />
                <FormControlLabel value="resnet" control={<Radio />} label="ResNet" />
                <FormControlLabel value="custom" control={<Radio />} label="Custom" />

            </RadioGroup>
            <Button variant="contained" type="submit" onClick={handleSubmit}>Submit</Button>

        </FormControl>
    )
}
