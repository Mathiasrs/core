"use client"

import { queryClient } from "@/app/providers"

// Libraries
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { ContentCreationRequest } from "@/lib/validators/content"

const createContentMutation = async ({
  contentId,
  title,
  description,
  slug,
}: ContentCreationRequest) => {
  const payload: ContentCreationRequest = {
    contentId,
    title,
    description,
    slug,
  }

  const { data } = await axios.post("/api/create/content/createContent", {
    payload,
  })

  return data
}

export function useCreateContent(setIsSheetOpen: any) {
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: createContentMutation,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contentAll"] })

      setIsSheetOpen(false)

      toast({
        title: "New content is created!",
      })
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    },
  })

  return mutation
}
