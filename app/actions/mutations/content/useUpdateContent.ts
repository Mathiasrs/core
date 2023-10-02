"use client"

// Next
import { useRouter } from "next/navigation"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Types
import { ContentCreationRequest } from "@/lib/validators/content"

export function useUpdateContent(slug: string, setSaveStatus: any) {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    async ({ id, content }: ContentCreationRequest) => {
      const payload: ContentCreationRequest = {
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
        queryClient.invalidateQueries(["content", slug])

        setSaveStatus("Saved")
      },
    },
  )

  return mutation
}
