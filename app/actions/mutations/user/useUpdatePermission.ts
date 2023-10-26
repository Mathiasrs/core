"use client"

// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"

// Types
import { Permission } from "@/types/typings"

const updatePermissionMutatation = async ({
  id,
  permissionKey,
  value,
}: Permission) => {
  return axios.post("/api/update/user/updatePermission", {
    id,
    permissionKey,
    value,
  })
}

export function useUpdatePermission() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: updatePermissionMutatation,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userById"] })

      toast({
        title: "User permission is now updated!",
      })
    },
    onError: (error) => {
      console.error("Mutation error with useUpdatePermission:", error)

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    },
  })

  return mutation
}
