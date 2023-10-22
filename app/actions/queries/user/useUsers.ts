// Libraries
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("/api/read/readAllUsers")

      return data
    },
  })
}
