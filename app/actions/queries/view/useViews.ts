// Libraries
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useViews(type: string) {
  return useQuery({
    queryKey: ["views"],
    queryFn: async () => {
      const { data } = await axios.post("/api/read/view/readViews", {
        type,
      })

      return data
    },
  })
}
