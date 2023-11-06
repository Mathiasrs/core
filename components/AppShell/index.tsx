"use client"

// Queries
import useProfile from "@/app/actions/queries/user/useUser"
import usePermissions from "@/actions/queries/user/usePermissions"

// Libraries
import { Toaster } from "@/components/ui/toaster"

// Components
import Deactivated from "@/components/AppShell/States/Deactivated"
import AwaitingApproval from "@/components/AppShell/States/AwaitingApproval"
import Active from "@/components/AppShell/States/Active"

export default function AppShell({ children, session }: any) {
  const { data: user, isLoading } = useProfile()
  const { data: permissions, isLoading: isLoadingPermissions } =
    usePermissions()

  const States = () => {
    const deactivated = <Deactivated />
    const awaitingApproval = <AwaitingApproval />
    const active = (
      <Active user={user} permissions={permissions} session={session}>
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

  return (
    <>
      <States />
      <Toaster />
    </>
  )
}
