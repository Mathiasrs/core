// Auth
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

// Libraries
import { FaArrowRightFromBracket } from "react-icons/fa6"

// Components

export default function AwaitingApproval() {
  return (
    <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8 mt-40">
      <div className="text-center">
        <h2 className="text-base font-semibold uppercase tracking-wide text-green-600">
          User activity
        </h2>
        <p className="mt-1 text-4xl font-extrabold text-zinc-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Awaiting your manager approval.
        </p>
        <p className="mx-auto mt-5 max-w-xl text-xl text-zinc-500 dark:text-zinc-400">
          Your account is awaiting your manager to accept and asign you the relevant user
          permissions.
        </p>
      </div>

      <div className="m-auto grid max-w-lg gap-2 pt-6 sm:flex sm:justify-center md:pt-8">
        <Button onClick={() => signOut()}>
          <FaArrowRightFromBracket className="h-4 w-4" aria-hidden="true" />{" "}
          <span className="pl-2">Sign out</span>
        </Button>
      </div>
    </div>
  )
}
