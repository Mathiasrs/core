// Next
import { redirect } from "next/navigation"

// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

// Compoonents
import Users from "@/components/Users"

export default async function UsersPage() {
  const session = (await getServerSession(authOptions)) as any

  if (!session) {
    redirect("/")
  }

  return <Users session={session} />
}
