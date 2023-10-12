"use client"

// Queries
import useContent from "@/actions/queries/content/useContent"
import FeaturedList from "@/components/FeaturedList"
import ContentList from "@/components/ContentList"

export default function KnowledgeBase() {
  const { data, isLoading, error } = useContent()

  //temporary isLoading and error handling. Implement Skeletons for loading
  if (isLoading) return "Loading"
  if (error) return "There was an error"

  return (
    <div className="grid gap-12">
      <FeaturedList data={data} />

      <ContentList />
    </div>
  )
}
