// Libraries
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useUser() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await axios.get("/api/read/user/readUser")

      return data
    },
  })
}
