"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { ContentCreationRequest } from "@/lib/validators/content"

export function useCreateContent(setIsSheetOpen: any, setIsMutating: any) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation(
    async ({ contentId, title, description, slug }: ContentCreationRequest) => {
      const payload: ContentCreationRequest = {
        contentId,
        title,
        description,
        slug,
      }

      const { data } = await axios.post("/api/create/content/createContent", {
        payload,
      })

      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["content"])

        setIsSheetOpen(false)

        toast({
          title: "New content is created!",
        })
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      },
    },
  )

  return mutation
}
