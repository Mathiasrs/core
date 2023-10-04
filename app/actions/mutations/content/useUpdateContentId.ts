"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { ContentIdCreationRequest } from "@/lib/validators/content"

export function useUpdateContentId() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation(
    async ({ id, contentId }: ContentIdCreationRequest) => {
      const payload: ContentIdCreationRequest = {
        id,
        contentId,
      }

      const { data } = await axios.post("/api/update/content/updateContentId", {
        payload,
      })

      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["content"])

        toast({
          title: "Photo is now updated!",
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
