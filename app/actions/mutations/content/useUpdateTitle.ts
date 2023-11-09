"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Types
import { TitleUpdateRequest } from "@/lib/validators/content"

const updateTitleMutation = async ({
  id,
  title,
  locale,
  contentId,
}: TitleUpdateRequest) => {
  const payload: TitleUpdateRequest = {
    id,
    title,
    locale,
    contentId,
  }

  const { data } = await axios.post("/api/update/content/updateContentTitle", {
    payload,
  })

  return data
}

export function useUpdateTitle(
  setSaveStatus: any,
  contentId: string,
  locale: any,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateTitleMutation,

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
