"use client"

// Queries
import useUsers from "@/app/actions/queries/user/useUsers"

// Components
import { DataTable } from "@/components/ui/table/data-table"
import { DataTableToolbar } from "@/components/ui/users/table/data-table-toolbar"
import { columns } from "@/components/ui/users/table/columns"
import EditUserSheet from "./EditUserSheet"

export default function ContentTable() {
  const { data, isLoading, error } = useUsers()

  return (
    <>
      <EditUserSheet />

      <DataTable
        data={data}
        isLoading={isLoading}
        error={error}
        columns={columns}
        DataTableToolbar={DataTableToolbar}
      />
    </>
  )
}
