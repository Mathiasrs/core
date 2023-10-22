"use client"

// Next
import Image from "next/image"

// Libraries
import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/lib/schema"

// Components
import { Checkbox } from "@/components/ui/checkbox"
import { userStatuses } from "@/components/data"
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex w-fit items-center gap-4">
        <Image
          src={
            row.getValue("image")
              ? row.getValue("image")
              : "https://res.cloudinary.com/dwh5z8lp5/image/upload/v1687339586/za4mqfois45pscl4xfk5.png"
          }
          alt={row.getValue("name")}
          width={32}
          height={32}
          className="h-6 w-6 rounded-3xl object-cover ring-2 ring-white ring-opacity-40 focus:outline-none focus:ring-opacity-100 xl:h-10 xl:w-10"
        />
        {row.getValue("name")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="" className="sr-only" />
    ),
    cell: ({ row }) => (
      <div className="sr-only flex w-fit items-center gap-4">
        {row.getValue("name")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = userStatuses.find(
        (status) => status.value === row.getValue("status"),
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-fit items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
