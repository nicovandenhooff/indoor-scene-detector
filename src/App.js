import React, { useEffect, useState } from "react"
import { Header, Body, Panel, NavBar } from "./components/layout";
import { Form } from "./components/form/Form";
import { ImageViewer } from "./components/image-viewer/ImageViewer";

import { ThemeContext } from './context'

import "./App.css"

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [image, setImage] = useState()
  const [imageURL, setImageURL] = useState('')
  const [network, setNetwork] = useState('grapefruit')

  useEffect(() => {
    if (!image) return
    // var img = anArray.pop();
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
          <Panel className="panel-form">
            <Form
              handleSubmit={handleSubmit}
              setImageURL={setImageURL}
              setNetwork={setNetwork}
              setImage={setImage}
            />
          </Panel>
          <Panel>
            {imageURL && <ImageViewer src={imageURL} />}
          </Panel>
          <Panel>
          </Panel>
        </Body>

      </div>
    </ThemeContext.Provider>
  )
}

export default App
