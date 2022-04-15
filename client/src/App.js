import React, { useState, useContext } from "react"
import { Body, Panel, NavBar, Modal } from "./components/layout";
import { Form } from "./components/form/Form";
import { ImageViewer } from "./components/image-viewer/ImageViewer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeContext } from "./context"
import { useModal } from './hooks';
import { Container, Box, Typography, CircularProgress } from '@mui/material';

import { GlobalStyles } from './global';

const App = () => {
  const [image, setImage] = useState()
  const [predictions, setPredictions] = useState(null)
  const [loading, setLoading] = useState(false)

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
            <Box sx={{
              display: 'flex',
              flex: '0 1 250px',
              maxWidth: '400px',
              padding: '36px 24px',
              marginLeft: '20px',
              marginRight: '20px',
              boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
              flexDirection: 'column',
              transition: 'all 0.4s ease-in',
              borderRadius: '4px'
            }}>
              <Form
                setImage={setImage}
                image={image}
                toggle={toggle}
                setPredictions={setPredictions}
                setLoading={setLoading}
                loading={loading}
              />
            </Box>
            <Box sx={{
              display: 'flex',
              flex: 1,
              padding: '36px 24px',
              marginLeft: '20px',
              marginRight: '20px',
              boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
              flexDirection: { sm: 'column', lg: 'row' },
              transition: 'all 0.4s ease-in',
              borderRadius: '4px'
            }}>
              <Box sx={{
                width: '450px',
                display: 'flex',
                flexDirection: "column",
                alignItems: 'center',
                flex: 1
              }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ display: 'flex', alignSelf: 'center', mb: '20px' }}
                >
                  Selected Image
                </Typography>
                {image && <ImageViewer src={image} />}
              </Box>
              <Box sx={{
                display: 'flex',
                flexDirection: "column",
                flex: 1
              }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ display: 'flex', alignSelf: 'center', mb: '20px' }}
                >
                  Top prediction
                </Typography>
                {loading
                  ? <Typography
                    variant="body"
                    component="div"
                    sx={{ display: 'flex', alignSelf: 'center', mb: '20px', flexDirection: "column" }}
                  >
                    <CircularProgress color="secondary" size='20px' sx={{ alignSelf: 'center' }} />
                    Calculating...
                  </Typography>
                  : predictions &&
                  <>
                    <Typography
                      variant="body"
                      component="div"
                      sx={{ display: 'flex', alignSelf: 'center', mb: '20px' }}
                    >
                      Class: {predictions.class}
                    </Typography>
                    <Typography
                      variant="body"
                      component="div"
                      sx={{ display: 'flex', alignSelf: 'center', mb: '20px' }}
                    >
                      Probability: {parseFloat(predictions.prob).toFixed(4)}
                    </Typography>
                  </>
                }
              </Box>
            </Box>
          </Body>
        </Container>
      </div>
    </>

  )
}

export default App