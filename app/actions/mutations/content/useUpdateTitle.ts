"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Types
import { TitleUpdateRequest } from "@/lib/validators/content"

export function useUpdateTitle(setSaveStatus: any) {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    async ({ id, title, slug }: TitleUpdateRequest) => {
      const payload: TitleUpdateRequest = {
        id,
        title,
        slug,
      }

      const { data } = await axios.post(
        "/api/update/content/updateContentTitle",
        {
          payload,
        },
      )

      return data
    },
    {
      onError: () => {
        setSaveStatus("Failed to save")
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["contentAll"])

        setSaveStatus("Saved")
      },
    },
  )

  return mutation
}
