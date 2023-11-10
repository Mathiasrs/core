// Libraries
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const { data } = await axios.get("/api/read/user/readSettings")

      return data
    },
  })
}
