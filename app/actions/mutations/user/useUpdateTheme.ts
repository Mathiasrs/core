"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { User } from "@/types/typings"

export function useUpdateTheme() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation(
    async ({ theme }: User) => {
      return axios.post("/api/update/updateTheme", {
        theme,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile"])

        toast({
          title: "The theme has been saved! 🚀",
        })
      },
      onError: (error) => {
        console.error("Mutation error with useUpdateTheme:", error)

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem saving your theme. 😔",
        })
      },
    }
  )

  return mutation
}
