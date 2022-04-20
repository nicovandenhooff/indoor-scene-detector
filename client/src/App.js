import React, { useContext } from "react"
import { NavBar } from "./components/layout";

import { Route, Routes } from "react-router-dom";

import { ThemeContext } from "./context"
import { About, Dashboard, Contact } from "./pages";


import { GlobalStyles } from './global';

const App = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <>
      <GlobalStyles />
      <div className={theme === 'light' ? 'light theme' : 'dark theme'}>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>

  )
}

export default App