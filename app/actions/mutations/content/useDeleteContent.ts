"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { ContentDeleteRequest } from "@/lib/validators/content"

export function useDeleteContent(setIsModalOpen: any) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation(
    async ({ id }: ContentDeleteRequest) => {
      const payload: ContentDeleteRequest = {
        id,
      }

      const { data } = await axios.post("/api/delete/content/deleteContent", {
        payload,
      })

      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["content"])

        setIsModalOpen(false)

        toast({
          title: "You succesfully deleted your content!",
        })
      },
      onError: () => {
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
