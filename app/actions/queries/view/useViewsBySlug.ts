"use client"

import { usePathname } from "next/navigation"

// Libraries
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useViewsByContentId(contentId: string, type: string) {
  const pathname = usePathname()

  const getEndOfPath = pathname ? pathname.split("/").pop() : ""

  return useQuery({
    queryKey: ["view", contentId],
    queryFn: async () => {
      if (contentId === getEndOfPath) {
        const { data } = await axios.post(
          "/api/create/view/createOrUpdateView",
          {
            contentId,
            type,
          },
        )

        return data
      } else {
        const { data } = await axios.post("/api/read/view/readViewByContentId", {
          contentId,
        })

        return data
      }
    },
  })
}
