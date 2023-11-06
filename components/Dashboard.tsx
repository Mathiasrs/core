"use client"

// Queries
import usePermissions from "@/actions/queries/user/usePermissions"

// Components
import Message from "@/components/Message"

export default function Dashboard() {
  const { data, isLoading, error } = usePermissions()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error...</div>

  return (
    <div className="grid items-center justify-center gap-4 text-4xl">
      {data.userCanViewDashboard ? (
        <h1>Dashboard</h1>
      ) : (
        <Message
          category="Access denied"
          title="You do not have access to this page."
          description="If you believe you should have access to this page, please contact your manager."
        />
      )}
    </div>
  )
}
