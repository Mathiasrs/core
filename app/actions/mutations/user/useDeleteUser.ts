"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { User } from "@/types/typings"

export function useDeleteUser() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation(
    async ({ id }: User) => {
      return axios.post("/api/delete/user/deleteUser", {
        id,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"])

        toast({
          title: "User is now deleted!",
        })
      },
      onError: (error) => {
        console.error("Mutation error with useDeleteUser:", error)

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
