import React, { useEffect, useState, useContext } from "react"
import { Body, Panel, NavBar, Modal } from "./components/layout";
import { Form } from "./components/form/Form";
import { ImageViewer } from "./components/image-viewer/ImageViewer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeToggle } from "./components/themeToggle/ThemeToggle";

import { ThemeContext } from "./context"
import { useModal } from './hooks';
import Container from '@mui/material/Container';
import axios from './axios';

import { GlobalStyles } from './global';

const App = () => {
  const [image, setImage] = useState()
  const [imageURL, setImageURL] = useState('')
  const [predictions, setPredictions] = useState({})

  const { theme } = useContext(ThemeContext)
  const { showModal, toggle } = useModal();

  useEffect(() => {
    if (!image) return
    const imageUrl = URL.createObjectURL(image)
    setImageURL(imageUrl)
  }, [image])


  return (
    <>
      <GlobalStyles />
      <div className={theme === 'light' ? 'light theme' : 'dark theme'}>
        <Router>
          <NavBar />
          {/* <Routes>
            <Route exact path="/" component={Dashboard} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Routes> */}
        </Router>
        <Modal
          isShowing={showModal}
          toggle={toggle}
        />
        <Container
          maxWidth="xl"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: { md: 'column' },
          }}>
          <ThemeToggle />
          <Body>
            <Panel className="panel-form">
              <Form
                setImage={setImage}
                image={image}
                toggle={toggle}
                setPredictions={setPredictions}
              />
            </Panel>
            <Panel>
              {imageURL && <ImageViewer src={imageURL} />}
            </Panel>
            <Panel>
              {
                Object.keys(predictions).map((key, i) => (
                  <p key={i}>
                    <span>{key}</span>
                    <span>: {predictions[key]}</span>
                  </p>
                ))
              }
            </Panel>
          </Body>
        </Container>
      </div>
    </>

  )
}

export default App