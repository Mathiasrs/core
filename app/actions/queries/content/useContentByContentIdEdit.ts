import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useContentByContentIdEdit(
  contentId: string,
  locale: any,
) {
  return useQuery({
    queryKey: ["contentAll", contentId, locale],
    queryFn: async () => {
      const { data } = await axios.post(
        "/api/read/content/readContentByContentId",
        {
          contentId,
          locale: locale.code,
        },
      )
      return data
    },
  })
}
