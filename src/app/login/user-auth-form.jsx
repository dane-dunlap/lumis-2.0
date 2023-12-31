"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { useRouter } from 'next/navigation';
import { useToast } from "../../../@/components/ui/use-toast";


export function UserAuthForm({ className, ...props }) {
  const router = useRouter();
  const { toast } = useToast()


  const [isLoading, setIsLoading] = React.useState(false);

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
  
  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  
      // sends a signIn request to supabase, authenticating the user
      const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    if (error) {
      // Handle error
      toast({title:"There was an error logging in",variant:"destructive"})
      console.error(error);
      
  } else {
      // Redirect and reload
      toast({title:"Login Successful"})
      window.location.href = '/search';


  }
};
  

  

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={handleEmailChange}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Enter password"
              type="password"
              onChange={handlePasswordChange}
              value={password}
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            Login
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          
        </div>
      </div>
      
    </div>
  );
}
