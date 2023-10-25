"use client"

// Next
import { useRouter } from "next/navigation"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Types
import { ContentUpdateRequest } from "@/lib/validators/content"

export function useUpdateContent(setSaveStatus: any) {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    async ({ id, content }: ContentUpdateRequest) => {
      const payload: ContentUpdateRequest = {
        id,
        content,
      }

      const { data } = await axios.post("/api/update/content/updateContent", {
        payload,
      })

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
