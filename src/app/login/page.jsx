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
    
    // sends a signIn request to supabase, authenticating the user
    const {data, error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    
    // Here you can write code to give visual feedback to the user
    // based on the success or failure of the sign-in procedure.
    // E.g. Toast notifications.
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