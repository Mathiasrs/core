"use client"

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

const FormSchema = z.object({
  contentId: z.string().max(12, {
    message: "Content ID can maximum be 12 characters.",
  }),
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  slug: z.string(),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(140, {
      message: "Description can maximum be 140 characters.",
    })
    .optional(),
})

export default function CreateContentSheet() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const createContent = useCreateContent()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data)

    const payload = {
      contentId: data.contentId,
      title: data.title,
      slug: generateSlug(data.title),
      description: data.description,
    }

    createContent.mutate(payload)
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button className="flex gap-2">
            <PlusIcon />
            <span>Create new</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:w-[34rem]">
          <SheetHeader>
            <SheetTitle>Create new content</SheetTitle>
            <SheetDescription>
              The first word is the hardest, but it unlocks a world of
              possibilities. Ready, set, create!
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 grid gap-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Add title" {...field} />
                    </FormControl>
                    <FormDescription>
                      The title should be descriptive for easy content
                      management.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Add description" {...field} />
                    </FormControl>
                    <FormDescription>
                      A description helps the user to quickly identify content.
                      It is of nature optional.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content ID</FormLabel>
                    <FormControl>
                      <Input placeholder="HT05102301" {...field} />
                    </FormControl>
                    <FormDescription>
                      A content ID will help structure and manage content. It is
                      a unique set of characters and numbers.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="absolute bottom-0 left-0 w-full p-4 pb-4">
                <Button type="submit" className="flex w-full gap-2">
                  <CheckIcon />
                  <span>Create now</span>
                </Button>
              </div>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
