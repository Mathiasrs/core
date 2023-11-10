"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { Settings } from "@/types/typings"

const updateLocaleMutation = async ({ locale }: Settings) => {
  return axios.post("/api/update/user/updateLocale", {
    locale,
  })
}

export function useUpdateLocale() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: updateLocaleMutation,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] })

      toast({
        title: "The language has been saved! 🚀",
      })
    },
    onError: (error) => {
      console.error("Mutation error with useUpdateLocale:", error)

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem saving your locale. 😔",
      })
    },
  })

  return mutation
}
