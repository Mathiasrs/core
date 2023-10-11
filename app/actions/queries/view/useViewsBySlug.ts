"use client"

import { usePathname } from "next/navigation"

// Libraries
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useViewsBySlug(slug: string, contentType: string) {
  const pathname = usePathname()

  const getEndOfPath = pathname ? pathname.split("/").pop() : ""

  return useQuery({
    queryKey: ["view", slug],
    queryFn: async () => {
      if (slug === getEndOfPath) {
        const { data } = await axios.post(
          "/api/create/view/createOrUpdateView",
          {
            slug,
            contentType,
          },
        )

        return data
      } else {
        const { data } = await axios.post("/api/read/view/readViewBySlug", {
          slug,
        })

        return data
      }
    },
  })
}
