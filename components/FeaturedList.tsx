// Queries
import useContent from "@/actions/queries/content/useContent"
import useViews from "@/actions/queries/view/useViews"

// Components
import SectionIntro from "@/components/SectionIntro"
import ContentCard from "@/components/ContentCard"

export default function FeaturedList({ locale }: { locale: any }) {
  const { data, isLoading, error } = useContent()

  const {
    data: views,
    isLoading: isLoadingViews,
    error: viewsError,
  } = useViews()

  const mostViewedContent =
    Array.isArray(views) && Array.isArray(data)
      ? views
          .sort((a: any, b: any) => Number(b.count) - Number(a.count))
          .slice(0, 3)
          .map((view: any) => {
            const trimmedContentId = view.contentId.trim() // Trim the contentId value
            const content = data.find(
              (content: any) => content.contentId === trimmedContentId,
            )

            return content
          })
          .filter(Boolean)
      : []

  if (isLoadingViews || isLoading) return <div>Loading...</div>

  if (error || viewsError) return <div>Failed to load</div>

  return (
    <div className="grid gap-6">
      <SectionIntro
        title="Most viewed"
        decription="Read the most viewed articles and discover what others are working on."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {mostViewedContent?.map((content: any) => {
          return (
            <ContentCard key={content?.id} data={content} locale={locale} />
          )
        })}
      </div>
    </div>
  )
}
