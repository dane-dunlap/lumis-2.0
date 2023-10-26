import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { UserSignupForm } from "./signup_form"

export const metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
  };

export default function AuthenticationPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        
        

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign up
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to sign up
              </p>
            </div>
            <UserSignupForm />
          </div>
        </div>
      </div>
    </>
  )
}
