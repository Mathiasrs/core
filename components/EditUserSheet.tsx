"use client"

// Components
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { useToggleEditUserSheet } from "@/app/actions/states/useToggleEditUserSheet"

export default function EditUserSheet() {
  const { isOpen, setIsOpen } = useToggleEditUserSheet()

  return (
    <Sheet open={isOpen?.isOpen} onOpenChange={() => setIsOpen()}>
      <SheetContent className="w-full sm:w-[34rem]">
        <SheetHeader>
          <SheetTitle>Edit user</SheetTitle>
          <SheetDescription>
            Below you can edit the user and provide the necessary user
            permissions.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
