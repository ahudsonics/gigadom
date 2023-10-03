// src/App.jsx

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/LoginForm/Login'
import Signup from './components/SignupForm/Signup'
import Todo from './components/TodoForm/Todo'
import Home from './components/HomePage/home'
import './App.css'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/todo" element={<Todo/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
