"use client"

// Queries
import useContent from "@/actions/queries/content/useContent"
import FeaturedList from "@/components/FeaturedList"
import ContentList from "@/components/ContentList"

export default function KnowledgeBase({ session }: any) {
  const { data, isLoading, error } = useContent(session)

  return (
    <div className="grid gap-12">
      <FeaturedList data={data} />

      <ContentList data={data} />
    </div>
  )
}
