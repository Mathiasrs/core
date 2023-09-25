// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

// Components
import { ThemeSelector } from "@/components/ThemeSelector"
import { redirect } from "next/navigation"
import Logout from "@/components/Logout"

export default async function Profile() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return (
    <div className="grid gap-4 items-center justify-center m-20 text-4xl">
      <h1>Profile</h1>
    </div>
  )
}
