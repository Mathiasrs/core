"use client"

// Next
import {  useRouter } from "next/navigation"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { ContentCreationRequest } from "@/lib/validators/content"

export function useUpdateContent() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation(
   async ({
    id,
    title,
    content,
    contentId
    }: ContentCreationRequest) => {
      const payload: ContentCreationRequest = {
        id,
        title,
        content,
        contentId,
      }
      const { data } = await axios.post("/api/update/content/updateArticle", {
        payload
       }
      )
      return data
    },
    {
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Your content was not updated. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {  
      router.back()
      queryClient.invalidateQueries(["content"])

      return toast({
        description: "You have updated your content!",
      })
    }}
  )

  return mutation
}
