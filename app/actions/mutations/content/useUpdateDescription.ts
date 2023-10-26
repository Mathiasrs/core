"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { DescriptionUpdateRequest } from "@/lib/validators/content"

const updateDescriptionMutation = async ({
  id,
  description,
}: DescriptionUpdateRequest) => {
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
}

export function useUpdateDescription(contentId: string) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: updateDescriptionMutation,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contentAll", contentId] })

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
  })

  return mutation
}
