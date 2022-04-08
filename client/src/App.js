import React, { useState, useContext } from "react"
import { Body, Panel, NavBar, Modal } from "./components/layout";
import { Form } from "./components/form/Form";
import { ImageViewer } from "./components/image-viewer/ImageViewer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeContext } from "./context"
import { useModal } from './hooks';
import { Container, Box, Typography } from '@mui/material';

import { GlobalStyles } from './global';

const App = () => {
  const [image, setImage] = useState()
  const [predictions, setPredictions] = useState({})

  const { theme } = useContext(ThemeContext)
  const { showModal, toggle } = useModal();

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
            flexDirection: 'column',
          }}>
          <Box sx={{
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'space-between',
            padding: '40px 40px 20px',
            fontSize: 'large',
            flexDirection: { sm: 'column', md: 'row' }
          }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ mr: 2, display: 'flex' }}
            >
              Some stuff we can put here...
            </Typography>
          </Box>
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
              {image && <ImageViewer src={image} />}
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