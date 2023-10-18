'use client'

import { useState } from 'react'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

function page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // instantiate supabase client
  const supabase = createClientComponentClient()

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // sends a sign up request to supabase email provider
    await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
     })

    console.log('Submitted:', { email, password })
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required            
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default page