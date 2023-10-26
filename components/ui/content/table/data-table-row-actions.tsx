"use client"

import { useState } from "react"

// Next
import Link from "next/link"

// Mutations
import { useUpdateLabel } from "@/actions/mutations/content/useUpdateLabel"
import { useUpdateStatus } from "@/app/actions/mutations/content/useUpdateStatus"
import { useUpdatePriority } from "@/app/actions/mutations/content/useUpdatePriority"
import { useDeleteContent } from "@/actions/mutations/content/useDeleteContent"

// Libraries
import { labels, statuses, priorities } from "@/components/data"
import { contentSchema } from "@/lib/schema"

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
  const content = contentSchema.parse(row.original)

  const updateContentLabel = useUpdateLabel()
  const updateContentStatus = useUpdateStatus(content.contentId)
  const updateContentPriority = useUpdatePriority(content.contentId)
  const deleteContent = useDeleteContent()

  const handleUpdateLabel = async (label: string) => {
    const payload = {
      id: content.id,
      label: label,
    }

    updateContentLabel.mutate(payload)
  }

  const handleUpdateStatus = async (status: string) => {
    const payload = {
      id: content.id,
      status: status,
    }

    updateContentStatus.mutate(payload)
  }

  const handleUpdatePriority = async (priority: string) => {
    const payload = {
      id: content.id,
      priority: priority,
    }

    updateContentPriority.mutate(payload)
  }

  const handleDeleteContent = async () => {
    const payload = {
      id: content.id,
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
          <Link className="w-full" href={`/content/edit/${content.contentId}`}>
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={content.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem
                  key={label.value}
                  value={label.value}
                  onClick={() => {
                    handleUpdateLabel(label.value)
                  }}
                >
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={content.status}>
              {statuses.map((status) => (
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
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Priority</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={content.priority}>
              {priorities.map((priority) => (
                <DropdownMenuRadioItem
                  key={priority.value}
                  value={priority.value}
                  onClick={() => {
                    handleUpdatePriority(priority.value)
                  }}
                >
                  {priority.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            handleDeleteContent()
          }}
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
