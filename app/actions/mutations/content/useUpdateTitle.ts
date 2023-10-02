"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Types
import { TitleCreationRequest } from "@/lib/validators/content"

export function useUpdateTitle(slug: string, setSaveStatus: any) {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    async ({ id, title, slug }: TitleCreationRequest) => {
      const payload: TitleCreationRequest = {
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
        queryClient.invalidateQueries(["content", slug])

        setSaveStatus("Saved")
      },
    },
  )

  return mutation
}
