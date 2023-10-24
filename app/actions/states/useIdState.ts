import { queryClient } from "@/app/providers"
import { useQuery } from "@tanstack/react-query"

interface IdState {
  id: string
}

export function useIdState() {
  const { data: id } = useQuery(["idState"], () => ({
    id: "",
  }))

  const setId = (newId: string) => {
    queryClient.setQueryData(["idState"], (prev: IdState | undefined) => {
      if (!prev) {
        return { id: newId }
      }
      return {
        ...prev,
        id: newId,
      }
    })
  }

  return { id, setId }
}
