import { useEffect, useRef, useState } from "react"

// Queries
import usePaginatedContent from "@/app/actions/queries/content/usePaginatedContent"

// Libraries
import { useIntersection } from "@mantine/hooks"

// Components
import ContentCard from "@/components/ContentCard"
import SectionIntro from "@/components/SectionIntro"
import LoadingSpinner from "@/components/LoadingSpinner"
import { DataContentToolbar } from "@/components/ui/content/data-content-toolbar"

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

  const [labelsFilter, setLabelsFilter] = useState<string[]>([])

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage()
  }, [entry, fetchNextPage])

  const content = infiniteData?.pages.flatMap((page) => page)

  const filteredContent = labelsFilter.length
    ? content?.filter((item) => labelsFilter.includes(item.label))
    : content

  return (
    <div className="grid gap-6">
      <SectionIntro
        title="All content"
        decription="Here is a list of all the content available. Consider searching or sort by label for quicker access to the specific content you seek."
      />

      <DataContentToolbar
        labelsFilter={labelsFilter}
        setLabelsFilter={setLabelsFilter}
      />

      <div className="grid gap-6">
        {filteredContent?.map((item, i) => {
          return i === filteredContent.length - 1 ? (
            <div key={item.id} ref={ref}>
              <ContentCard key={item?.id} data={item} />
            </div>
          ) : (
            <ContentCard key={item?.id} data={item} />
          )
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
