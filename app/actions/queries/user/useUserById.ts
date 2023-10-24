// Libraries
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useUserById(id: any) {
  return useQuery({
    queryKey: ["userById", id],
    queryFn: async () => {
      const { data } = await axios.post("/api/read/user/readUserById", id)

      return data
    },
    enabled: !!id,
  })
}
