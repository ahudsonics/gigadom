import React, { useState } from 'react';

const Signup = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSignup = async () => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      // Store token in local storage or context for further use
      console.log('Token:', data.token);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={e => setCredentials({ ...credentials, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
