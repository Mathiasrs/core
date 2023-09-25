"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { Image } from "@/types/typings"

export function useUpdateImage() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation(
    async ({ image }: Image) => {
      return axios.post("/api/update/updateImage", {
        image,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile"])

        toast({
          title: "Photo is now updated!",
        })
      },
      onError: (error) => {
        console.error("Mutation error with useUpdateImage:", error)

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      },
    }
  )
  return mutation
}
