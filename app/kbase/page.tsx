// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

// Components
import { redirect } from "next/navigation"

export default async function Kbase() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return (
    <div className="m-20 grid items-center justify-center gap-4 text-4xl">
      <h1>Knowledge Base</h1>
    </div>
  )
}
