"use client"

// Queries
import usePermissions from "@/actions/queries/user/usePermissions"
export default function Dashboard() {
  const { data, isLoading, error } = usePermissions()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error...</div>

  return (
    <div className="m-20 grid items-center justify-center gap-4 text-4xl">
      {data.userCanViewDashboard ? <h1>Dashboard</h1> : <h1>Not allowed</h1>}
    </div>
  )
}
