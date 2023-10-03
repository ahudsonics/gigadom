// src/App.jsx

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Todo from './components/Todo'
import './App.css'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/todo" component={Todo} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
