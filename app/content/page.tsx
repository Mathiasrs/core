// Next
import { redirect } from "next/navigation"

// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

// Components
import Content from "@/components/Content"

export default async function ContentPage() {
  const session = (await getServerSession(authOptions)) as any

  if (!session) {
    redirect("/")
  }

  return <Content session={session} />
}
