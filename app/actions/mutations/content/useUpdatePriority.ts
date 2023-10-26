"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { PriorityUpdateRequest } from "@/lib/validators/content"

const updatePriorityMutation = async ({
  id,
  priority,
}: PriorityUpdateRequest) => {
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
}

export function useUpdatePriority(contentId: string) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: updatePriorityMutation,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contentAll", contentId] })
      queryClient.invalidateQueries({ queryKey: ["contentAll"] })

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
  })

  return mutation
}
