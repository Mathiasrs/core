"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { DescriptionUpdateRequest } from "@/lib/validators/content"

export function useUpdateDescription() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation(
    async ({ id, description }: DescriptionUpdateRequest) => {
      const payload: DescriptionUpdateRequest = {
        id,
        description,
      }

      const { data } = await axios.post(
        "/api/update/content/updateContentDescription",
        {
          payload,
        },
      )

      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["content", "contentAll"])

        toast({
          title: "Description is now updated!",
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
