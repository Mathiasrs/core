// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

// Components
import { ThemeSelector } from "@/components/ThemeSelector"
import { redirect } from "next/navigation"
import Logout from "@/components/Logout"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return (
    <div className="grid gap-4 items-center justify-center m-20 text-4xl">
      <h1>Dashboard</h1>

      <div className="flex place-self-center">
        <ThemeSelector />
      </div>

      <div className="m-auto grid max-w-lg gap-2 pt-6 sm:flex sm:justify-center md:pt-8">
        <Logout />
      </div>
    </div>
  )
}
