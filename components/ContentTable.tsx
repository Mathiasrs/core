"use client"

// Queries
import useContent from "@/actions/queries/content/useContent"

// Components
import { DataTable } from "@/components/ui/data-table"
import { columns } from "@/components/ui/columns"

export default function ContentTable(session: any) {
  const { data, isLoading, error } = useContent(session)

  return <DataTable data={data} isLoading={isLoading} error={error} columns={columns} />
}
