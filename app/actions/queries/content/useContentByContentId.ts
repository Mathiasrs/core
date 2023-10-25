// Libraries
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useContentByContentId(contentId: any) {
  return useQuery({
    queryKey: ["content", contentId],
    queryFn: async () => {
      const { data } = await axios.post(
        "/api/read/content/readContentByContentId",
        {
          contentId,
        },
      )

      return data
    },
  })
}
