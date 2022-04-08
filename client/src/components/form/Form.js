import React from "react"
import {
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup
} from "@mui/material";


import "./Form.css"

export const Form = ({ handleSubmit, setImage, setNetwork, setTransferLearning, loading }) => {

    const handleNetworkChange = (e) => setNetwork(e.target.value)
    const handleTransferLearningChange = (e) => setTransferLearning(e.target.value)

    const submitButton = () => {
        return !loading ?
            <Button variant="contained" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            : <Button variant="contained" type="submit" onClick={handleSubmit}>
                <CircularProgress color="secondary" size='20px' />
            </Button>
    }

    return (
        <FormControl className="form">
            Upload an image:
            <input
                type="file"
                label="Image"
                name="myFile"
                accept=".jpeg, .png, .jpg"
                onChange={setImage}
            />
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
            {submitButton()}

        </FormControl>
    )
}
