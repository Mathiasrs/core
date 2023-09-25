"use client"

// React
import { useState } from "react"

// Auth
import { signIn } from "next-auth/react"

// Libraries
import { FaSlack } from "react-icons/fa6"

// Components

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/Logo"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function Authentication() {
  const [isSigningIn, setIsSigningIn] = useState(false)

  const handleSignIn = async () => {
    setIsSigningIn(true)
    signIn("slack", {
      redirect: false,
      callbackUrl: "/dashboard",
    })
  }

  return (
    <div className="flex flex-col justify-center py-20 sm:px-6 lg:px-8 mt-20">
      <div className="m-auto flex w-80 max-w-lg flex-col justify-between p-3">
        <div className="pb-6">
          <div className="flex justify-center">
            <div className="flex w-1/2 bg-gradient-to-r from-[#047857] to-green-500 py-10 px-10 items-center justify-center rounded-2xl">
              <Logo isLarge />
            </div>
          </div>

          <h2 className="text-center text-xl font-extrabold text-zinc-900 dark:text-white pt-10">
            Sign in using your Slack account
          </h2>
        </div>

        {isSigningIn ? (
          <Button disabled>
            <LoadingSpinner
              fillColor={"fill-white"}
              textColor={"text-zinc-200 dark:text-zinc-600"}
              className="w-4 h-5"
            />
            <span className="flex pl-2">Signing in</span>
          </Button>
        ) : (
          <Button onClick={() => handleSignIn()}>
            <FaSlack className="h-4 w-4" /> <span className="flex pl-2">Continue with Slack</span>
          </Button>
        )}
      </div>
    </div>
  )
}
