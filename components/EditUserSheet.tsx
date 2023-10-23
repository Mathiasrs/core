"use client"

import { useState } from "react"

// Mutations
import { useCreateContent } from "@/app/actions/mutations/content/useCreateContent"

// Libraries
import { CheckIcon, PlusIcon } from "@radix-ui/react-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Helpers
import { generateSlug } from "@/lib/helpers/generateSlug"

// Components
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { ContentCreationValidator } from "@/lib/validators/content"
import { useToggleEditUserSheet } from "@/app/actions/states/useToggleEditUserSheet"

export default function EditUserSheet() {
  const { isOpen, setIsOpen } = useToggleEditUserSheet()
  const [isMutating, setIsMutating] = useState(false)

  const form = useForm<z.infer<typeof ContentCreationValidator>>({
    resolver: zodResolver(ContentCreationValidator),
  })

  const createContent = useCreateContent(setIsOpen, setIsMutating)

  function onSubmit(data: z.infer<typeof ContentCreationValidator>) {
    const payload = {
      contentId: data.contentId,
      title: data.title,
      slug: generateSlug(data.title),
      description: data.description,
    }
    createContent.mutate(payload)
  }

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
