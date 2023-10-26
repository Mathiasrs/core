"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { ContentDeleteRequest } from "@/lib/validators/content"

const deleteContentMutation = async ({ id }: ContentDeleteRequest) => {
  const payload: ContentDeleteRequest = {
    id,
  }

  const { data } = await axios.post("/api/delete/content/deleteContent", {
    payload,
  })

  return data
}

export function useDeleteContent() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: deleteContentMutation,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contentAll"] })

      toast({
        title: "You succesfully deleted your content!",
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
