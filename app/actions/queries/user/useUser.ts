// Libraries
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useUser(session: any) {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!session) {
        return null
      }

      const { data } = await axios.get("/api/read/readUser")

      return data
    },
  })
}
