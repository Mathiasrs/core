import { useEffect, useRef } from "react"

// Queries
import usePaginatedContent from "@/app/actions/queries/content/usePaginatedContent"

// Libraries
import { useIntersection } from "@mantine/hooks"

// Components
import ContentCard from "@/components/ContentCard"
import SectionIntro from "@/components/SectionIntro"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function ContentList() {
  const {
    data: infiniteData,
    fetchNextPage,
    isFetchingNextPage,
  } = usePaginatedContent()

  const lastitemRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastitemRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage()
  }, [entry, fetchNextPage])

  const content = infiniteData?.pages.flatMap((page) => page)

  return (
    <div className="grid gap-6">
      <SectionIntro
        title="All content"
        decription="Here is a list of all the content available. Consider searching or sort by label for quicker access to the specific content you seek."
      />

      <div className="grid gap-6">
        {content?.map((item, i) => {
          if (i === content.length - 1)
            return (
              <div key={item.id} ref={ref}>
                <ContentCard key={item?.id} data={item} />
              </div>
            )
          return <ContentCard key={item?.id} data={item} />
        })}
      </div>

      <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
        {isFetchingNextPage ? (
          <LoadingSpinner
            fillColor={"fill-green-500"}
            textColor={"text-zinc-200 dark:text-zinc-600"}
            className="h-8 w-8"
          />
        ) : (infiniteData?.pages.length ?? 0) < 3 ? (
          "Load more"
        ) : (
          "No more content to load"
        )}
      </button>
    </div>
  )
}
