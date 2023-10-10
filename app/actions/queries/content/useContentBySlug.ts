// Libraries
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useContentBySlug({ session, slug }: any) {
  return useQuery({
    queryKey: ["content"],
    queryFn: async () => {
      if (!session) {
        return null
      }

      const { data } = await axios.post("/api/read/content/readContentBySlug", {
        slug,
      })

      return data
    },
  })
}
