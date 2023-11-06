// Auth
import Message from "@/components/Message"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

// Libraries
import { FaArrowRightFromBracket } from "react-icons/fa6"

// Components

export default function AwaitingApproval() {
  return (
    <div className="mx-auto mt-40 max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Message
        category="User actitivty"
        title="Awaiting your manager approval."
        description="Your account is awaiting your manager to accept and asign you the relevant user permissions."
      />

      <div className="m-auto grid max-w-lg gap-2 pt-6 sm:flex sm:justify-center md:pt-8">
        <Button onClick={() => signOut()}>
          <FaArrowRightFromBracket className="h-4 w-4" aria-hidden="true" />{" "}
          <span className="pl-2">Sign out</span>
        </Button>
      </div>
    </div>
  )
}
