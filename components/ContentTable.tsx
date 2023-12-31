"use client"

// Queries
import useAllContent from "@/app/actions/queries/content/useAllContent"

// Components
import { DataTable } from "@/components/ui/table/data-table"
import { DataTableToolbar } from "@/components/ui/content/table/data-table-toolbar"
import { columns } from "@/components/ui/content/table/columns"

export default function ContentTable() {
  const { data, isLoading, error } = useAllContent()

  return (
    <DataTable
      data={data}
      isLoading={isLoading}
      error={error}
      columns={columns}
      DataTableToolbar={DataTableToolbar}
    />
  )
}
