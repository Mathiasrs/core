"use client"

// Queries
import FeaturedList from "@/components/FeaturedList"
import ContentList from "@/components/ContentList"

export default function KnowledgeBase() {
  return (
    <div className="grid gap-12">
      <FeaturedList />

      <ContentList />
    </div>
  )
}
