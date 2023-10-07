"use client"

import { useState } from "react"

// Next
import Link from "next/link"

// Mutations
import { useUpdateLabel } from "@/actions/mutations/content/useUpdateLabel"
import { useDeleteContent } from "@/actions/mutations/content/useDeleteContent"

// Libraries
import { labels } from "@/lib/data"
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
  const [isModelOpen, setIsModelOpen] = useState(false)
  const content = contentSchema.parse(row.original)

  const updateContentLabel = useUpdateLabel()
  const deleteContent = useDeleteContent(setIsModelOpen)

  const handleUpdateLabel = async (label: string) => {
    const payload = {
      id: content.id,
      label: label,
    }

    updateContentLabel.mutate(payload)
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
          <Link className="w-full" href={`/content/edit/${content.slug}`}>
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
