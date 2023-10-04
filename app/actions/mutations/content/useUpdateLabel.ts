"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Types
import { LabelCreationRequest } from "@/lib/validators/content"

export function useUpdateLabel() {
  const queryClient = useQueryClient()

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
      onError: () => {},
      onSuccess: () => {
        queryClient.invalidateQueries(["content"])
      },
    },
  )

  return mutation
}
