import React, { useEffect, useState, useContext } from "react"
import { Body, Panel, NavBar, Modal } from "./components/layout";
import { Form } from "./components/form/Form";
import { ImageViewer } from "./components/image-viewer/ImageViewer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeToggle } from "./components/themeToggle/ThemeToggle";

import { ThemeContext } from "./context"
import { useModal } from './hooks';
import Container from '@mui/material/Container';
import axios from 'axios';

import { GlobalStyles } from './global';

const App = () => {
  const [image, setImage] = useState()
  const [imageURL, setImageURL] = useState('')
  const [network, setNetwork] = useState('alexnet')
  const [postImage, setPostImage] = useState({
    myFile: "",
  });
  const [predictions, setPredictions] = useState({})

  const { theme } = useContext(ThemeContext)

  const { showModal, toggle } = useModal();

  useEffect(() => {
    if (!image) return
    const imageUrl = URL.createObjectURL(image)
    setImageURL(imageUrl)
  }, [image])


  // const handleSubmit = (e) => {

  //   if (!image || !network) {
  //     return toggle(true)
  //   }

  //   console.log(image[0])
  //   e.preventDefault()

  //   axios.post('/predict', { data: image[0] })
  //     .then(res => {
  //       console.log(`response = ${res.data}`)
  //       // setName(res.data)
  //     })
  //     .catch(error => {
  //       console.log(`error = ${error}`)
  //     })

  //   // return fetch("/predict", {
  //   //   method: "POST",
  //   //   headers: { "Content-Type": "application/json" },
  //   //   body: JSON.stringify({ image }),
  //   // })
  //   //   .then((res) => res.json())
  //   //   .then((data) => {
  //   //     console.log('data', data)
  //   //   })
  // }

  const createImage = (newImage) => axios.post('/predict', {
    newImage, network
  }).then((res) => {
    setPredictions(res.data)
  })

  const createPost = async (post) => {
    try {
      await createImage(post);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
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


  const handleFileUpload = async (e) => {
    console.log(e.target.files)
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage(base64);
    setImage(file)
  };


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
                handleSubmit={handleSubmit}
                setImageURL={setImageURL}
                setNetwork={setNetwork}
                setImage={(e) => handleFileUpload(e)}
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
