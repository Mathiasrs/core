"use client"

// States
import { useToggleEditUserSheet } from "@/app/actions/states/useToggleEditUserSheet"
import { useIdState } from "@/app/actions/states/useIdState"

// Components
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

export default function EditUserSheet() {
  const { isOpen, setIsOpen } = useToggleEditUserSheet()
  const { id } = useIdState()

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
