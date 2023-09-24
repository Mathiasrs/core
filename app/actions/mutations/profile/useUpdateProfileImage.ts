// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Types
import { ProfileImage } from "typings"

export function useUpdateProfileImage() {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    async ({ id, image }: ProfileImage) => {
      return axios.post("/api/create/createOrUpdateProfileImage", {
        id,
        image,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile"])
      },
      onError: (error) => {
        console.error("Mutation error:", error)
      },
    },
  )

  return mutation
}
