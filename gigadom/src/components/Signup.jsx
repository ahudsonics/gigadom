// src/components/Signup.jsx

import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({ email, password })

    try {
      const res = await axios.post('http://localhost:5174/api/auth/signup', body, config)
      console.log('Signup successful', res.data)
    } catch (err) {
      console.error('Signup failed', err.response.data)
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          minLength="6"
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Signup
