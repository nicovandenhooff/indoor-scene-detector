import React, { useState } from "react"
import {
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup
} from "@mui/material";
import axios from '../../axios';

import "./Form.css"

export const Form = ({ image, toggle, setImage, setPredictions }) => {

    const [network, setNetwork] = useState('alexnet')
    const [transferLearning, setTransferLearning] = useState('tuned')
    const [postImage, setPostImage] = useState({ myFile: "", });
    const [loading, setLoading] = useState(false)

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage(base64);
        setImage(file)
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleNetworkChange = (e) =>
        setNetwork(e.target.value)

    const handleTransferLearningChange = (e) =>
        setTransferLearning(e.target.value)

    const handleSubmit = (e) => {
        if (!image || !network) {
            return toggle(true)
        }
        setLoading(true)
        e.preventDefault();

        return axios.post('/api/predict', {
            newImage: postImage, network, transferLearning
        }).then((res) => {
            setPredictions(res.data)
            setLoading(false)
        }).catch(e => {
            console.log(`error = ${e}`)
        })
    };


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
                onChange={handleFileUpload}
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
