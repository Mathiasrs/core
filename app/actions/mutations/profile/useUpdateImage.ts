// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Types
import { Image } from "@/types/typings"

export function useUpdateImage() {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    async ({ image }: Image) => {
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
