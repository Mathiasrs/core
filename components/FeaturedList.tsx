// Queries
import useViews from "@/actions/queries/view/useViews"

// Components
import SectionIntro from "@/components/SectionIntro"
import ContentCard from "@/components/ContentCard"

export default function FeaturedList({ data, type }: any) {
  const {
    data: views,
    isLoading: isLoadingViews,
    error: viewsError,
  } = useViews(type)

  const mostViewedContent =
    Array.isArray(views) && Array.isArray(data)
      ? views
          .sort((a: any, b: any) => Number(b.count) - Number(a.count))
          .slice(0, 3)
          .map((view: any) => {
            const article = data.find(
              (article: any) => article.slug === view.slug,
            )
            return article
          })
      : []

  if (isLoadingViews)
    return <div className="grid gap-12 lg:grid-cols-3 lg:gap-6"></div>

  if (viewsError) return <div>Failed to load</div>

  return (
    <div className="grid gap-6">
      <SectionIntro
        title="Most viewed"
        decription="Read the most viewed articles and discover what others are working on."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {mostViewedContent?.map((content: any) => {
          return <ContentCard key={content?.id} data={content} />
        })}
      </div>
    </div>
  )
}
