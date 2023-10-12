"use client"

// Queries
import useContent from "@/app/actions/queries/content/useContent"

// Components
import { DataTable } from "@/components/ui/data-table"
import { columns } from "@/components/ui/columns"

export default function ContentTable() {
  const { data, isLoading, error } = useContent()

  return (
    <DataTable
      data={data}
      isLoading={isLoading}
      error={error}
      columns={columns}
    />
  )
}
