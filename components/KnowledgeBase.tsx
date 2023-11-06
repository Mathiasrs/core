"use client"

// Queries
import usePermissions from "@/actions/queries/user/usePermissions"

// Libraries
import getPhrase from "@/lib/helpers/phrases"

// Components
import FeaturedList from "@/components/FeaturedList"
import ContentList from "@/components/ContentList"
import Message from "@/components/Message"

export default function KnowledgeBase({ session }: any) {
  const { data, isLoading, error } = usePermissions()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error...</div>

  return (
    <div className="flex h-full flex-1 flex-col gap-6 space-y-8 p-2 lg:p-8">
      {data.userCanViewContent ? (
        <>
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back, {session.user?.name.split(" ")[0]}!
              </h2>
              <p className="text-muted-foreground">{getPhrase()}</p>
            </div>
          </div>
          <div className="grid gap-12">
            <FeaturedList />

            <ContentList />
          </div>
        </>
      ) : (
        <Message
          category="Access denied"
          title="You do not have access to this page."
          description="If you believe you should have access to this page, please contact your manager."
        />
      )}
    </div>
  )
}
