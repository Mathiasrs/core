"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Types
import { ContentUpdateRequest } from "@/lib/validators/content"

const updateContentMutation = async ({
  id,
  content,
  locale,
  contentId,
}: ContentUpdateRequest) => {
  const payload: ContentUpdateRequest = {
    id,
    content,
    locale,
    contentId,
  }

  const { data } = await axios.post("/api/update/content/updateContent", {
    payload,
  })

  return data
}

export function useUpdateContent(
  setSaveStatus: any,
  contentId: string,
  locale: any,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateContentMutation,

    onError: () => {
      setSaveStatus("Failed to save")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contentAll", contentId, locale],
      })

      setSaveStatus("Saved")
    },
  })

  return mutation
}
