"use client"

// Libraries
import { Button } from "@/components/ui/button"

// Components
import { signOut } from "next-auth/react"
import { FaArrowRightFromBracket } from "react-icons/fa6"

export default function Logout() {
  return (
    <Button onClick={() => signOut()}>
      <FaArrowRightFromBracket className="h-4 w-4" aria-hidden="true" />{" "}
      <span className="pl-2">Sign out</span>
    </Button>
  )
}
