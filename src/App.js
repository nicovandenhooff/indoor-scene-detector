import React, { useState } from "react"
import { Header, NavBar } from "./components/layout";

import { ThemeContext } from './context'

import "./App.css"


const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [input, setInput] = useState('')

  const setTheme = () => {
    setIsDarkTheme(state => !state);
  }

  const handleChange = (e) => {
    const input = e.target.value
    setInput(input)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    return fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
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
      <div className={isDarkTheme ? "app-dark" : "app"}>
        <Header>
          <NavBar />
        </Header>
        <form className="form" onSubmit={handleSubmit}>
          <label className="label">Simple input</label>
          <div>
            <input
              type="text"
              name="input"
              value={input}
              onChange={handleChange}
            />
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
