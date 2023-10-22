"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { User } from "@/types/typings"

export function useUpdateStatus() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation(
    async ({ id, status }: User) => {
      return axios.post("/api/update/user/updateStatus", {
        id,
        status,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"])

        toast({
          title: "Status is now updated!",
        })
      },
      onError: (error) => {
        console.error("Mutation error with useUpdateUser:", error)

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      },
    },
  )

  return mutation
}
