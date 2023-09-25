// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Types
import { User } from "@/types/typings"

export function useUpdateUser() {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    async ({ name, about, url }: User) => {
      return axios.post("/api/update/updateProfile", {
        name,
        about,
        url,
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
