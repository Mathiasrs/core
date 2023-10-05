"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Types
import { ContentCreationRequest } from "@/lib/validators/content"

export function useCreateContent() {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    async ({ contentId, title, description, slug }: ContentCreationRequest) => {
      const payload: ContentCreationRequest = {
        contentId,
        title,
        description,
        slug,
      }

      const { data } = await axios.post("/api/update/content/createContent", {
        payload,
      })

      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["content"])
      },
      onError: () => {},
    },
  )

  return mutation
}
