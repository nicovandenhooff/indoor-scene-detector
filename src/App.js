import React, { useEffect, useState } from "react"
import { Header, Body, Panel, NavBar, Modal } from "./components/layout";
import { Form } from "./components/form/Form";
import { ImageViewer } from "./components/image-viewer/ImageViewer";
import { useModal, useDarkMode } from './hooks';
import { ThemeProvider as GlobalThemeProvider } from 'styled-components';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { lightThemeMui, darkThemeMui, lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';

import "./App.css"

const App = () => {
  const [image, setImage] = useState()
  const [imageURL, setImageURL] = useState('')
  const [network, setNetwork] = useState('alexnet')

  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const { showModal, toggle } = useModal();

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

  if (!componentMounted) {
    return null
  }

  return (
    <GlobalThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <MuiThemeProvider theme={theme === 'light' ? lightThemeMui : darkThemeMui}>
        <GlobalStyles />
        <div className={theme === 'light' ? 'light theme' : 'dark theme'}>
          <Header>
            <NavBar />
          </Header>
          <Modal
            isShowing={showModal}
            toggle={toggle}
          />
          <Body>
            <button
              type="button"
              className="theme-button"
              onClick={toggleTheme}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/light-theme-img.png"
                className="theme-img"
                alt="theme"
              />
            </button>
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
      </MuiThemeProvider>
    </GlobalThemeProvider>
  )
}

export default App
