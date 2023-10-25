"use client"

// Queries
import useViewsByContentId from "@/actions/mutations/view/useViewsByContentId"
import { Input } from "./ui/input"

export default function Views({
  contentId,
  type,
  isInInput,
}: {
  contentId: string
  type: string
  isInInput?: boolean
}) {
  const { data, isLoading } = useViewsByContentId(contentId, type)

  if (isLoading)
    return (
      <>
        {isInInput ? (
          <Input
            type="text"
            disabled
            defaultValue={"--- views"}
            className="animate-pulse text-gray-500 dark:text-gray-400"
          />
        ) : (
          <div className="animate-pulse text-gray-500 dark:text-gray-400">
            --- views
          </div>
        )}
      </>
    )

  const views = data ? data?.total : null

  return (
    <>
      {isInInput ? (
        <Input
          type="text"
          disabled
          defaultValue={`${
            views ? new Number(views).toLocaleString() : "–––"
          } views`}
        />
      ) : (
        <>{`${views ? new Number(views).toLocaleString() : "–––"} views`}</>
      )}
    </>
  )
}
