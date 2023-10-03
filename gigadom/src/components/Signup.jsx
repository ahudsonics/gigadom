// src/components/Signup.jsx

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Make a request to your server for signup using axios
      const res = await axios.post('/api/auth/signup', { email, password })
      console.log('Signup successful', res.data)
    } catch (error) {
      console.error('Signup failed', error.response.data)
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      <Link to="/login">Already have an account? Login here</Link>
    </div>
  )
}

export default Signup
