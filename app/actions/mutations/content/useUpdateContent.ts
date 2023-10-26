"use client"

// Next
import { useRouter } from "next/navigation"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Types
import { ContentUpdateRequest } from "@/lib/validators/content"

const updateContentMutation = async ({ id, content }: ContentUpdateRequest) => {
  const payload: ContentUpdateRequest = {
    id,
    content,
  }

  const { data } = await axios.post("/api/update/content/updateContent", {
    payload,
  })

  return data
}

export function useUpdateContent(setSaveStatus: any) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateContentMutation,

    onError: () => {
      setSaveStatus("Failed to save")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contentAll"] })

      setSaveStatus("Saved")
    },
  })

  return mutation
}
