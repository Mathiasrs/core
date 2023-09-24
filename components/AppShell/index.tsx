"use client"

// Queries
import useProfile from "@/actions/queries/profile/useProfile"

// Components
import Deactivated from "@/components/AppShell/States/Deactivated"
import AwaitingApproval from "@/components/AppShell/States/AwaitingApproval"
import Active from "@/components/AppShell/States/Active"

export default function AppShell({ children, session }: any) {
  const { data: user, isLoading } = useProfile(session)

  const States = () => {
    const deactivated = <Deactivated />
    const awaitingApproval = <AwaitingApproval />
    const active = (
      <Active user={user} session={session}>
        {children}
      </Active>
    )

    if (!session) {
      return children
    }

    if (isLoading) return null

    switch (user?.status) {
      case "active":
        return active
      case "deactivated":
        return deactivated
      default:
        return awaitingApproval
    }
  }

  return <States />
}
