"use client"

// Auth
import { useSession } from "next-auth/react"

// Components
import useContentBySlug from "@/app/actions/queries/content/useContentBySlug"
import EditorSkeleton from "@/components/ui/skeletons/EditorSkeleton"
import EditContentOptions from "@/components/EditContentOptions"

// Libraries
import { Editor } from "novel"
import { useUpdateContent } from "@/app/actions/mutations/user/useUpdateContent"
import { useEffect, useState } from "react"

type pageProps = {
  params: {
    slug: string
  }
}

export default function Page({ params }: pageProps) {
  const [saveStatus, setSaveStatus] = useState("Saved")

  const { data: session } = useSession()

  const slug = params.slug
  const { data: content, isLoading } = useContentBySlug({ session, slug })

  if (isLoading) return <EditorSkeleton />

  const updateContentMutation = useUpdateContent(slug)

  const handleEditorUpdate = async (editor: any) => {
    if (editor) {
      const state = editor.state
      const json = state.doc.toJSON()

      console.log("json", json)

      const payload = {
        id: content.id,
        content: json,
      }

      updateContentMutation.mutate(payload)
    }
  }

  // Debug useEffect
  useEffect(() => {
    console.log("Initial content from the database:", content?.content)
  }, [content])

  const [initialContent, setInitialContent] = useState("")

  useEffect(() => {
    if (content?.content) {
      setInitialContent(content?.content)
    }
  }, [content])

  return (
    <div className="grid grid-cols-6 items-start gap-6">
      <div className="col-span-6 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Content editor
          </h3>
        </div>
      </div>
      <div className="col-span-6 grid gap-4 md:col-span-4">
        <Editor
          onDebouncedUpdate={handleEditorUpdate}
          debounceDuration={750}
          disableLocalStorage
          // storageKey={`novel__content__${slug}`}
          defaultValue={initialContent ? initialContent : ""}
        />
      </div>

      <div className="col-span-6 grid gap-4 md:col-span-2">
        <EditContentOptions content={content} />
      </div>
    </div>
  )
}
