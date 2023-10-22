"use client"

// Next
import Link from "next/link"

// Mutations
import { useUpdateStatus } from "@/actions/mutations/user/useUpdateStatus"
import { useDeleteUser } from "@/actions/mutations/user/useDeleteUser"

// Libraries
import { userStatuses } from "@/components/data"
import { userSchema } from "@/lib/schema"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const user = userSchema.parse(row.original)

  const updateUserStatus = useUpdateStatus()
  const deleteContent = useDeleteUser()

  const handleUpdateStatus = async (status: string) => {
    const payload = {
      id: user.id,
      status: status,
    }

    updateUserStatus.mutate(payload)
  }

  const handleDeleteUser = async () => {
    const payload = {
      id: user.id,
    }

    deleteContent.mutate(payload)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <Link className="w-full" href="">
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={user.name}>
              {userStatuses.map((status) => (
                <DropdownMenuRadioItem
                  key={status.value}
                  value={status.value}
                  onClick={() => {
                    handleUpdateStatus(status.value)
                  }}
                >
                  {status.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            handleDeleteUser()
          }}
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
