"use client"

// Queries
import useContent from "@/actions/queries/content/useContent"

export default function KnowledgeBase({ session }: any) {
  const { data, isLoading, error } = useContent(session)

  return <></>
}
