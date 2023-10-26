"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { StatusUpdateRequest } from "@/lib/validators/content"

const updateStatusMutation = async ({ id, status }: StatusUpdateRequest) => {
  const payload: StatusUpdateRequest = {
    id,
    status,
  }

  const { data } = await axios.post("/api/update/content/updateContentStatus", {
    payload,
  })

  return data
}

export function useUpdateStatus(contentId: string) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: updateStatusMutation,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contentAll", contentId] })

      toast({
        title: "Status is now updated!",
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
