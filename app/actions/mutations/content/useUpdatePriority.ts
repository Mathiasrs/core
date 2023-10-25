"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { PriorityUpdateRequest } from "@/lib/validators/content"

export function useUpdatePriority() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation(
    async ({ id, priority }: PriorityUpdateRequest) => {
      const payload: PriorityUpdateRequest = {
        id,
        priority,
      }

      const { data } = await axios.post(
        "/api/update/content/updateContentPriority",
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
          title: "Priority is now updated!",
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
