// Next
import { redirect } from "next/navigation"

// Auth
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"

// Components
import Authentication from "@/components/Authentication"

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return <Authentication />
}
