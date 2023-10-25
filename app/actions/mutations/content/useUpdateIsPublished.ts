"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Types
import { IsPublishedUpdateRequest } from "@/lib/validators/content"

export function useUpdateIsPublished(setSaveStatus: any) {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    async ({ id, isPublished }: IsPublishedUpdateRequest) => {
      const payload: IsPublishedUpdateRequest = {
        id,
        isPublished,
      }

      const { data } = await axios.post(
        "/api/update/content/updateIsPublished",
        payload,
      )

      return data
    },
    {
      onError: () => {
        setSaveStatus("Failed to save")
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["content", "contentAll"])

        setSaveStatus("Saved")
      },
    },
  )

  return mutation
}
