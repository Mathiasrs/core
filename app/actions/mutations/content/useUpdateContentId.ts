"use client"

// Next
import { useRouter } from "next/navigation"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { ContentIdUpdateRequest } from "@/lib/validators/content"

export function useUpdateContentId() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const router = useRouter()

  const mutation = useMutation(
    async ({ id, contentId }: ContentIdUpdateRequest) => {
      const payload: ContentIdUpdateRequest = {
        id,
        contentId,
      }

      const { data } = await axios.post("/api/update/content/updateContentId", {
        payload,
      })

      router.push(`/content/edit/${contentId}`)

      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["contentAll"])

        toast({
          title: "Content ID is now updated!",
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
