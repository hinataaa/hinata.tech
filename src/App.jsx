import React, { Component } from 'react'
import logo from './logo.svg'
import { Steps, Icon } from 'antd'
import './App.css'

const { Step } = Steps

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to bangbisai!</h1>
        </header>
        <p className="App-intro">
          To get started, edi132t <code>src/App.js</code> and save to reload.
        </p>
        <Steps>
          <Step status="finish" title="Login" icon={<Icon type="user" />} />
          <Step status="finish" title="Verification" icon={<Icon type="solution" />} />
          <Step status="process" title="Pay" icon={<Icon type="loading" />} />
          <Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
        </Steps>
      </div>
    )
  }
}

export default App
