// Libraries
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useContent() {
  return useQuery({
    queryKey: ["content"],

    queryFn: async () => {
      const { data } = await axios.get("/api/read/content/readAllContent")

      return data
    },
  })
}
