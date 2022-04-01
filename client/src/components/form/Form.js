import React from "react"
import ImageUploader from "react-images-upload";

import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import "./Form.css"

export const Form = ({ handleSubmit, setImage, setNetwork, setTransferLearning }) => {

    const handleNetworkChange = (e) => setNetwork(e.target.value)
    const handleTransferLearningChange = (e) => setTransferLearning(e.target.value)

    return (
        <FormControl className="form">
            <input
                type="file"
                label="Image"
                name="myFile"
                accept=".jpeg, .png, .jpg"
                onChange={setImage}
            />
            {/* <ImageUploader
                className="image-uploader"
                name="image"
                withIcon={true}
                buttonText="Upload Image"
                buttonClassName="upload-button"
                onChange={setImage}
                imgExtension={[".jpg", ".png"]}
                singleImage={true}
                maxFileSize={5242880} /> */}
            Select a network:
            <RadioGroup
                aria-labelledby="network-label"
                defaultValue="alexnet"
                name="network"
                onChange={handleNetworkChange}
                className="radio-group"
            >
                <FormControlLabel value="alexnet" control={<Radio />} label="AlexNet" />
                <FormControlLabel value="densenet121" control={<Radio />} label="DenseNet" />
                <FormControlLabel value="resnet18" control={<Radio />} label="ResNet" />
                <FormControlLabel value="simple_cnn" control={<Radio />} label="Simple Network" />

            </RadioGroup>
            <RadioGroup
                aria-labelledby="network-label"
                defaultValue="tuned"
                name="transferLearning"
                onChange={handleTransferLearningChange}
                className="radio-group"
            >
                <FormControlLabel value="tuned" control={<Radio />} label="Fully tuned" />
                <FormControlLabel value="featex" control={<Radio />} label="Last layer tuned" />

            </RadioGroup>
            <Button variant="contained" type="submit" onClick={handleSubmit}>Submit</Button>

        </FormControl>
    )
}
