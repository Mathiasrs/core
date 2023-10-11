// Libraries
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useViews() {
  return useQuery({
    queryKey: ["views"],
    queryFn: async () => {
      const { data } = await axios.post("/api/read/view/readViews")

      return data
    },
  })
}
