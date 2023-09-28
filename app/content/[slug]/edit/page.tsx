"use client"
// Next
import { notFound } from "next/navigation"

// Auth
import { useSession } from "next-auth/react"

// Components
import { Editor } from "@/components/Editor"
import { Button } from "@/components/ui/button"
import useContentBySlug from "@/app/actions/queries/content/useContentBySlug"
import EditorSkeleton from "@/components/ui/skeletons/EditorSkeleton"
import EditContentOptions from "@/components/EditContentOptions"

interface pageProps {
  params: {
    slug: string
  }
}

const Page = ({ params }: pageProps) => {
  const { data: session } = useSession()

  const slug = params.slug
  const { data: content, isLoading } = useContentBySlug({ session, slug })

  if (isLoading) return <EditorSkeleton />

  return (
    <div className="grid grid-cols-6 items-start gap-6">
      <div className="col-span-6 border-b border-gray-200 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            Content editor
          </h3>
        </div>
      </div>
      <div className="col-span-6 grid gap-4 md:col-span-4">
        <Editor data={content} />

        <div className="flex w-full justify-end">
          <Button type="submit" className="w-full" form="article-form">
            Update
          </Button>
        </div>
      </div>

      <div className="col-span-6 grid gap-4 md:col-span-2">
        <EditContentOptions content={content} />
      </div>
    </div>
  )
}

export default Page
