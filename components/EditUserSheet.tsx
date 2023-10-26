"use client"

import { useState } from "react"

// Queries
import useUserById from "@/actions/queries/user/useUserById"

// States
import { useToggleEditUserSheet } from "@/actions/states/useToggleEditUserSheet"
import { useIdState } from "@/actions/states/useIdState"

// Libraries
import { Cross1Icon } from "@radix-ui/react-icons"

// Components
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Button } from "@/components/ui/button"
import { ComboBox } from "./ui/combobox"
import { useUpdatePermission } from "@/app/actions/mutations/user/useUpdatePermission"
import { Label } from "./ui/label"
import { cn } from "@/lib/utils"

const permissionNames = {
  userCanViewDashboard: "View Dashboard",
  userCanViewContent: "View Content",
  userCanEditContent: "Edit Content",
  userCanCreateContent: "Create Content",
  userCanViewSlack: "View Slack",
  userCanViewUsers: "View Users",
  userCanEditUsers: "Edit Users",
}

export default function EditUserSheet() {
  const { isOpen, setIsOpen } = useToggleEditUserSheet()
  const { id } = useIdState()
  const [isAdding, setIsAdding] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const [removingKey, setRemovingKey] = useState<string | null>(null)
  const { data } = useUserById(id)

  const permissions = data?.permission[0]

  const availablePermissions = Object.entries(permissions || {}).reduce<
    Array<{ displayName: string; key: string; value: boolean }>
  >((acc, [key, value]) => {
    if (value === false) {
      const displayName = (permissionNames as Record<string, string>)[key]
      if (displayName) {
        acc.push({ displayName, key, value })
      }
    }
    return acc
  }, [])

  const activePermissions = Object.entries(permissions || {}).reduce<
    Array<{ displayName: string; key: string; value: boolean }>
  >((acc, [key, value]) => {
    if (value === true) {
      const displayName = (permissionNames as Record<string, string>)[key]
      if (displayName) {
        acc.push({ displayName, key, value })
      }
    }
    return acc
  }, [])

  const mutation = useUpdatePermission()

  const handleDisablePermission = async (key: string) => {
    setIsAdding(false)
    setIsRemoving(true)
    setRemovingKey(key)
    mutation.mutate({
      id: permissions?.id,
      permissionKey: key,
      value: false,
    })
  }

  const handleAddPermission = async (key: string) => {
    setIsAdding(true)
    mutation.mutate({
      id: permissions?.id,
      permissionKey: key,
      value: true,
    })
  }

  return (
    <Sheet open={isOpen?.isOpen} onOpenChange={() => setIsOpen()}>
      <SheetContent className="flex w-full flex-col gap-8 sm:w-[34rem]">
        <SheetHeader>
          <SheetTitle>Edit user</SheetTitle>
          <SheetDescription>
            Below you can edit the user and provide the necessary user
            permissions. You are currently editing the user {data?.name}.
          </SheetDescription>
        </SheetHeader>

        <div>
          <div className="mb-4 flex flex-col">
            <Label className="text-md font-semibold">
              Available permissions
            </Label>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Use the dropdown list to add new permissions.
            </p>
          </div>
          <ComboBox
            text="Add new permission"
            textEmpty="No permissions found"
            items={availablePermissions}
            onSelect={handleAddPermission}
          />
        </div>

        <ScrollArea className="flex w-full flex-col">
          <div className="mb-4 flex flex-col">
            <Label className="text-md font-semibold">Active permissions</Label>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Here you can view the user&apos;s current permissions. If you
              click on one of them, they will be disabled, and you can add them
              again from the menu above.
            </p>
          </div>

          <div className="mb-2 flex flex-wrap gap-2">
            {activePermissions.map(({ displayName, key }, index) => (
              <Button
                variant="outline"
                key={index}
                className={cn(
                  "flex gap-1",
                  isRemoving && removingKey === key ? "animate-pulse" : "",
                )}
                onClick={() => handleDisablePermission(key)}
              >
                <span>{displayName}</span>
                <Cross1Icon />
              </Button>
            ))}

            {mutation.isPending && isAdding && (
              <Button variant="outline" className="flex animate-pulse gap-1">
                <span>
                  {
                    (permissionNames as Record<string, string>)[
                      mutation.variables.permissionKey
                    ]
                  }
                </span>
                <Cross1Icon />
              </Button>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
