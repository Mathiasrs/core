"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Types
import { TitleUpdateRequest } from "@/lib/validators/content"

const updateTitleMutation = async ({ id, title, slug }: TitleUpdateRequest) => {
  const payload: TitleUpdateRequest = {
    id,
    title,
    slug,
  }

  const { data } = await axios.post("/api/update/content/updateContentTitle", {
    payload,
  })

  return data
}

export function useUpdateTitle(setSaveStatus: any) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateTitleMutation,

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
