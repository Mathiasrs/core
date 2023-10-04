"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { LabelCreationRequest } from "@/lib/validators/content"

export function useUpdateLabel() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation(
    async ({ id, label }: LabelCreationRequest) => {
      const payload: LabelCreationRequest = {
        id,
        label,
      }

      const { data } = await axios.post(
        "/api/update/content/updateContentLabel",
        {
          payload,
        },
      )

      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["content"])

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
    },
  )

  return mutation
}
