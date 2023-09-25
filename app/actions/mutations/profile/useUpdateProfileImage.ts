// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Types
import { ProfileImage } from "@/types/typings"

export function useUpdateProfileImage() {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    async ({ image }: ProfileImage) => {
      return axios.post("/api/update/updateImage", {
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
    }
  )

  return mutation
}
