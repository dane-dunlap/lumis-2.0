'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthForm() {
  const supabase = createClientComponentClient()

  return (
    
<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    {/* Logo and Header outside the Auth component */}
    <img
      className="mx-auto h-40 w-auto"
      src="https://fileserviceuploadsperm.blob.core.windows.net/files/file-HSEcUXtmpQlvtZWcGvnzfukM?se=2023-10-09T20%3A22%3A12Z&sp=r&sv=2021-08-06&sr=b&rscd=attachment%3B%20filename%3D60897c7c-1fc6-4365-a45d-1bc53c2d94c8.png&sig=y4TytwWIWFKJ4NVxNk5GKc8kAdvQotGujhWygaWEayQ%3D"
      alt="Your Company"
    />
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Sign in to your account
    </h2>

    {/* Supabase Auth Component */}
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={[]}
      redirectTo="http://localhost:3000/auth/callback"
    />


   
  </div>
</div>


    
   
  )
}