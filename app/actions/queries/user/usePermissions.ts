// Libraries
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function usePermissions() {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: async () => {
      const { data } = await axios.get("/api/read/user/readPermissions")

      return data
    },
  })
}
