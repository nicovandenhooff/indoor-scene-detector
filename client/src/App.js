import React, { useState, useContext } from "react"
import { Body, NavBar, Modal } from "./components/layout";
import { Form } from "./components/form/Form";
import { ImageViewer } from "./components/image-viewer/ImageViewer";

import { BrowserRouter as Router } from "react-router-dom";

import { ThemeContext } from "./context"
import { useModal } from './hooks';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import { Table, TableBody, TableCell, TableRow, TableHead } from '@mui/material';


import { GlobalStyles } from './global';

const App = () => {
  const [image, setImage] = useState()
  const [predictions, setPredictions] = useState(null)
  const [loading, setLoading] = useState(false)

  const { theme } = useContext(ThemeContext)
  const { showModal, toggle } = useModal();

  let heatmap

  if (predictions) {
    const str = predictions.saliency_b64.slice(0, -1)
    heatmap = str.substring(2)
  }

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
            padding: '40px 40px 20px',
          }}>
            <Typography
              variant="h6"
              component="p"
              sx={{ mb: 1 }}
            >
              Welcome to Indoor Scene Detector!
            </Typography>
            <Typography
              variant="body"
              component="p"
              sx={{ mb: 2 }}
            >
              Please select or upload an image of an indoor scene to classify it.
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
                  Image to classify:
                </Typography>
                {image && <ImageViewer src={image} />}
              </Box>
              <Box sx={{
                display: 'flex',
                flexDirection: "column",
                flex: 1,
                alignItems: 'center'
              }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ display: 'flex', alignSelf: 'center', mb: '20px' }}
                >
                  Top 3 class predictions:
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
                  <Table aria-label="simple table" sx={{ width: '400px' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Class</TableCell>
                        <TableCell>Probability</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {predictions.predictions.map((prediction, i) => (
                        <TableRow
                          key={prediction.class}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {i + 1}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {prediction.class}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {parseFloat(prediction.prob).toFixed(4)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                }
                {heatmap && !loading &&
                  <>
                    < Typography
                      variant="h6"
                      component="div"
                      sx={{ mt: '70px', display: 'flex', alignSelf: 'center' }}
                    >
                      Saliency Coefficient Heatmap (Key Pixels)
                    </Typography>
                    <ImageViewer src={`data:image/jpeg;base64,${heatmap}`} />
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