"use client"

// Queries
import useAllContent from "@/app/actions/queries/content/useAllContent"

// Components
import { DataTable } from "@/components/ui/data-table"
import { columns } from "@/components/ui/columns"

export default function ContentTable() {
  const { data, isLoading, error } = useAllContent()

  return (
    <DataTable
      data={data}
      isLoading={isLoading}
      error={error}
      columns={columns}
    />
  )
}
