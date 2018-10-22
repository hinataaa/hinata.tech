import React, { Component } from 'react'

import logo from '@/assets/logo.svg'
import Login from '@/routes/Test'

import './App.css'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to bangbisai!</h1>
        </header>
        <Login />
      </div>
    )
  }
}

export default App
