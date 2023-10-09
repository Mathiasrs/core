"use client"

// Queries
import useContent from "@/actions/queries/content/useContent"
import FeaturedList from "./FeaturedList"

export default function KnowledgeBase({ session }: any) {
  const { data, isLoading, error } = useContent(session)

  return (
    <>
      <FeaturedList data={data} />
    </>
  )
}
