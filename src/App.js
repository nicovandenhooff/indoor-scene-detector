import React, { useEffect, useState } from "react"
import { Header, Body, Panel, NavBar } from "./components/layout";
import ImageUploader from "react-images-upload";

import { ThemeContext } from './context'

import "./App.css"

import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [image, setImage] = useState()
  const [imageURL, setImageURL] = useState('')
  const [network, setNetwork] = useState('grapefruit')


  useEffect(() => {
    if (!image) return
    const imageUrl = URL.createObjectURL(image[0])
    setImageURL(imageUrl)
  }, image)


  const setTheme = () => {
    setIsDarkTheme(state => !state);
  }


  const handleSubmit = (e) => {

    // check inputs before submission
    e.preventDefault()
    return fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ network, image }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data)
      })
  }

  return (
    <ThemeContext.Provider
      value={{ isDarkTheme, toggleTheme: setTheme }}
    >
      <div className={isDarkTheme ? "app app-dark" : "app"}>
        <Header>
          <NavBar />
        </Header>
        <Body>
          <Panel>
            <FormControl>
              <ImageUploader
                name="image"
                withIcon={true}
                buttonText="Upload Image"
                onChange={setImage}
                imgExtension={[".jpg", ".png"]}
                maxFileSize={5242880} />
              <FormLabel id="network-label">Select a network</FormLabel>
              <RadioGroup
                aria-labelledby="network-label"
                defaultValue="alexnet"
                name="network-group"
                onChange={setNetwork}
              >
                <FormControlLabel value="alexnet" control={<Radio />} label="AlexNet" />
                <FormControlLabel value="densenet" control={<Radio />} label="DenseNet" />
                <FormControlLabel value="resnet" control={<Radio />} label="ResNet" />
                <FormControlLabel value="custom" control={<Radio />} label="Custom" />

              </RadioGroup>
              <Button variant="contained" type="submit" onClick={handleSubmit}>Submit</Button>

            </FormControl>

          </Panel>

          <Panel>
            {imageURL && <img src={imageURL} className="uploadPicture" alt="upload" />}
          </Panel>
          <Panel>
          </Panel>
        </Body>

      </div>
    </ThemeContext.Provider>
  )
}

export default App
