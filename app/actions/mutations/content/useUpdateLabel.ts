"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { LabelUpdateRequest } from "@/lib/validators/content"

const updateLabelMutation = async ({ id, label }: LabelUpdateRequest) => {
  const payload: LabelUpdateRequest = {
    id,
    label,
  }

  const { data } = await axios.post("/api/update/content/updateContentLabel", {
    payload,
  })

  return data
}

export function useUpdateLabel() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: updateLabelMutation,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contentAll"] })

      toast({
        title: "Label is now updated!",
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
