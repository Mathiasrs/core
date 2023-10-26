"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { IsPublishedUpdateRequest } from "@/lib/validators/content"

const updateIsPublishedMutation = async ({
  id,
  isPublished,
}: IsPublishedUpdateRequest) => {
  const payload: IsPublishedUpdateRequest = {
    id,
    isPublished,
  }

  const { data } = await axios.post(
    "/api/update/content/updateIsPublished",
    payload,
  )

  return data
}

export function useUpdateIsPublished(contentId: string) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: updateIsPublishedMutation,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contentAll", contentId] })

      toast({
        title: "Yo have now changed the publication status!",
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
