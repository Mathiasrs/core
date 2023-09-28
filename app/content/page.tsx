// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

// Components
import { redirect } from "next/navigation"

import ContentTable from "@/components/ContentTable"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return (
    <>
      <div className="flex h-full flex-1 flex-col space-y-8 p-2 lg:p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your content!
            </p>
          </div>
        </div>

        <ContentTable session={session} />
      </div>
    </>
  )
}
