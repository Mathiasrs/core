// Libraries
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useContent(session: any) {
  return useQuery({
    queryKey: ["content"],
    queryFn: async () => {
      if (!session) {
        return null
      }

      const { data } = await axios.get("/api/read/readContent")

      return data
    },
  })
}
