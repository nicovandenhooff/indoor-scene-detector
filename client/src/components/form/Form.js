import React, { useState } from "react"
import {
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import axios from '../../axios';
import { ImageSelection } from "../image-selection";

import "./Form.css"
import { FileUploader } from "../file-uploader";

export const Form = ({ image, toggle, setImage, setPredictions, loading, setLoading }) => {

    const [network, setNetwork] = useState('alexnet')
    const [postImage, setPostImage] = useState(null);

    const handleFileUpload = async (e) => {
        const target = e.target

        let file
        let imageUrl

        if (!!target.id) {
            const img = document.getElementById(target.id)
            const blob = await (await fetch(img.src)).blob()
            imageUrl = target.src
            file = new File([blob], imageUrl, blob)
        } else {
            file = e.target.files[0];
            imageUrl = URL.createObjectURL(file)
        }

        const base64 = await convertToBase64(file);
        setPostImage(base64);
        setImage(imageUrl)
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

    const handleSubmit = (e) => {
        if (!image || !network) {
            return toggle(true)
        }
        setLoading(true)
        e.preventDefault();

        const modelName = network !== "simple_cnn"
            ? network + '_tuned'
            : "simple_cnn"

        return axios.post('/api/predict', {
            image: postImage, modelName
        }).then((res) => {
            setPredictions(res.data)
            setLoading(false)
        }).catch(e => {
            console.log(`error = ${e}`)
        })
    };


    const submitButton = () => {

        return (
            <Button variant="contained" type="submit" onClick={handleSubmit} sx={{
                alignSelf: "flex-end",
                width: "100%",
                maxWidth: "-webkit-fill-available"
            }} >
                {'Submit'}
            </Button>
        )
    }

    return (
        <FormControl className="form">

            <Typography>1. Select or upload an image:</Typography>
            <ImageSelection handleFileUpload={handleFileUpload} />

            <FileUploader handleFileUpload={handleFileUpload} />

            <Typography>2. Select a network:</Typography>
            <RadioGroup
                aria-labelledby="network-label"
                defaultValue="alexnet"
                name="network"
                onChange={handleNetworkChange}
                className="radio-group"
            >
                <FormControlLabel value="alexnet" control={<Radio />} label={<Typography variant="body2">AlexNet</Typography>} />
                <FormControlLabel value="densenet121" control={<Radio />} label={<Typography variant="body2">DenseNet</Typography>} />
                <FormControlLabel value="resnet18" control={<Radio />} label={<Typography variant="body2">ResNet</Typography>} />
                <FormControlLabel value="simple_cnn" control={<Radio />} label={<Typography variant="body2">Simple Network</Typography>} />

            </RadioGroup>
            {submitButton()}

        </FormControl>
    )
}
