import React, { useEffect, useState } from "react"
import { Header, Body, Panel, NavBar, Modal } from "./components/layout";
import { Form } from "./components/form/Form";
import { ImageViewer } from "./components/image-viewer/ImageViewer";
import { ThemeContext } from './context'
import { useModal } from './hooks';

import "./App.css"

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [image, setImage] = useState()
  const [imageURL, setImageURL] = useState('')
  const [network, setNetwork] = useState('alexnet')

  const { showModal, toggle } = useModal();

  const setTheme = () => setIsDarkTheme(state => !state)

  useEffect(() => {
    if (!image) return


    const imageUrl = URL.createObjectURL(image[0])
    setImageURL(imageUrl)
  }, [image])


  const handleSubmit = (e) => {

    if (!image || !network) {
      return toggle(true)
    }

    console.log({
      image,
      network
    })

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
        <Modal
          isShowing={showModal}
          toggle={toggle}
        />
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
