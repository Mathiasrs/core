import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"

export default function usePaginatedContent() {
  return useInfiniteQuery(
    ["paginatedContent"],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.post(
        "/api/read/content/readPaginatedContent",
        { pageParam },
      )

      return data
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1
      },
    },
  )
}
