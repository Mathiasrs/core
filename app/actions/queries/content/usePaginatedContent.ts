import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"

const pageSize = 2

const fetchPaginatedContent = async ({ pageParam = 1 }) => {
  const { data } = await axios.post("/api/read/content/readPaginatedContent", {
    pageParam,
    pageSize,
  })

  return data
}

export default function usePaginatedContent() {
  return useInfiniteQuery({
    queryKey: ["paginatedContent"],
    queryFn: fetchPaginatedContent,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages, lastPageParam) =>
      lastPage.length < pageSize ? undefined : lastPageParam + 1,
  })
}
