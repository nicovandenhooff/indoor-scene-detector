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
  const [transferLearning, setTransferLearning] = useState('tuned')
  const [postImage, setPostImage] = useState({
    myFile: "",
  });
  const [predictions, setPredictions] = useState({})
  const [data, setData] = useState()

  const { theme } = useContext(ThemeContext)

  const { showModal, toggle } = useModal();


  useEffect(() => {
    const url = 'api/v1.0/predict'

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();

        setData(json.items);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData()

  }, [])

  useEffect(() => {
    if (!image) return
    const imageUrl = URL.createObjectURL(image)
    setImageURL(imageUrl)
  }, [image])

  if (!data) return null

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

  const createImage = (newImage) => axios.post('http://localhost:5000/api/predict', {
    newImage, network, transferLearning
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
            {data && data.map(home => <div>{home.name}</div>)}

            <Panel className="panel-form">
              <Form
                handleSubmit={handleSubmit}
                setImageURL={setImageURL}
                setNetwork={setNetwork}
                setImage={(e) => handleFileUpload(e)}
                setTransferLearning={setTransferLearning}
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



// import React from 'react';
// import './index.css'

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       error: null,
//       isLoaded: false,
//       items: [],
//     };
//   }

//   componentDidMount() {
//     fetch("api/v1.0/predict")
//       .then(res => res.json())
//       .then(
//         (result) => {
//           this.setState({
//             isLoaded: true,
//             items: result.items,
//           });
//         },
//         (error) => {
//           this.setState({
//             isLoaded: true,
//             error,
//           });
//         }
//       )
//   }

//   render() {
//     const { error, isLoaded, items } = this.state;
//     if (error) {
//       return <div>Error: {error.message}</div>;
//     } else if (!isLoaded) {
//       return <div>Loading...</div>;
//     } else {
//       return (
//         <ul>
//           {items.map(item => (
//             <li key={item.name}>
//               {item.name} {item.price}
//             </li>
//           ))}
//         </ul>
//       );
//     }
//   }
// }


// export default App