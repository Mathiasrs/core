// Next
import { redirect } from "next/navigation"

// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

// Libraries

// Components
import UserTable from "@/components/UserTable"

export default async function Users() {
  const session = (await getServerSession(authOptions)) as any

  if (!session) {
    redirect("/")
  }

  return (
    <div className="flex h-full flex-1 flex-col gap-6 space-y-8 p-2 lg:p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {" "}
            Welcome back, {session.user?.name.split(" ")[0]}!
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all users!
          </p>
        </div>
      </div>

      <UserTable />
    </div>
  )
}
