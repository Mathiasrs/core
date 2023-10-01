"use client"

// Next
import { useRouter } from "next/navigation"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { ContentCreationRequest } from "@/lib/validators/content"

export function useUpdateContent(slug: string) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation(
    async ({ id, content }: ContentCreationRequest) => {
      const payload: ContentCreationRequest = {
        id,
        content,
      }

      const { data } = await axios.post("/api/update/content/updateContent", {
        payload,
      })

      return data
    },
    {
      onError: () => {
        return toast({
          title: "Something went wrong.",
          description: "Your content was not updated. Please try again.",
          variant: "destructive",
        })
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["content", slug])

        return toast({
          description: "You have updated your content!",
        })
      },
    },
  )

  return mutation
}
