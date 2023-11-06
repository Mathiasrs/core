// Next
import { redirect } from "next/navigation"

// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import KnowledgeBase from "@/components/KnowledgeBase"

export default async function Kbase() {
  const session = (await getServerSession(authOptions)) as any

  if (!session) {
    redirect("/")
  }

  return <KnowledgeBase session={session} />
}
