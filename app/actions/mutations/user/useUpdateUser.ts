"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { User } from "@/types/typings"

const updateUserMutation = async ({ name, about, url }: User) => {
  return axios.post("/api/update/updateProfile", {
    name,
    about,
    url,
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: updateUserMutation,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] })

      toast({
        title: "Profile is now updated!",
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
  })

  return mutation
}
