// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

// Components
import { redirect } from "next/navigation"
import EditProfile from "@/components/EditProfile"

export default async function Profile() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3 mb-4">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-zinc-900 dark:text-white">Profile</h2>
        <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          This information will be displayed publicly so be careful what you share.
        </p>
      </div>

      <EditProfile session={session} />
    </div>
  )
}
