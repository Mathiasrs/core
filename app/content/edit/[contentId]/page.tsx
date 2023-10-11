"use client"

import { useEffect, useState } from "react"

// Next
import Link from "next/link"

// Queries
import useContentByContentId from "@/actions/queries/content/useContentByContentId"

// Mutations
import { useUpdateTitle } from "@/app/actions/mutations/content/useUpdateTitle"
import { useUpdateContent } from "@/app/actions/mutations/content/useUpdateContent"

// Libraries
import { Editor } from "novel"
import { useDebouncedCallback } from "use-debounce"
import { FaArrowCircleLeft } from "react-icons/fa"

// Helpers
import { generateSlug } from "@/lib/helpers/generateSlug"
import { Badge } from "@/components/ui/badge"

// Components
import EditorSkeleton from "@/components/ui/skeletons/EditorSkeleton"
import EditContentOptions from "@/components/EditContentOptions"

type pageProps = {
  params: {
    contentId: string
  }
}

export default function Page({ params }: pageProps) {
  const [initialContent, setInitialContent] = useState("")
  const [saveStatus, setSaveStatus] = useState("")

  const contentId = params.contentId
  const { data: content, isLoading } = useContentByContentId(contentId)


  const debouncedSetTitle = useDebouncedCallback((title) => {
    handleUpdateTitle(title)
  }, 750)

  const updateTitleMutation = useUpdateTitle(setSaveStatus)
  const updateContentMutation = useUpdateContent(setSaveStatus)

  const handleUpdateTitle = async (title: string) => {
    setSaveStatus("Saving...")
    const payload = {
      id: content.id,
      title: title,
      slug: generateSlug(title),
    }
    updateTitleMutation.mutate(payload)
  }

  const handleEditorUpdate = async (editor: any) => {
    setSaveStatus("Saving...")
    if (editor) {
      const state = editor.state
      const json = state.doc.toJSON()
      const payload = {
        id: content.id,
        content: json,
      }
      updateContentMutation.mutate(payload)
    }
  }

  useEffect(() => {
    if (content?.content) {
      setInitialContent(content?.content)
    }
  }, [content])

  if (isLoading) return <EditorSkeleton />

  return (
    <div className="grid grid-cols-6 items-start gap-6">
      <div className="col-span-6 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Link
            href="/content"
            className="flex items-center gap-2 text-gray-900 hover:opacity-80 dark:text-white"
          >
            <FaArrowCircleLeft className="h-4 w-4" />
            <span>Go back</span>
          </Link>
          -{" "}
          <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Content editor
          </h3>
          {saveStatus && <Badge variant="outline">{saveStatus}</Badge>}
        </div>
      </div>

      <div className="prose prose-stone dark:prose-invert relative order-2 col-span-6 rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 lg:order-1 lg:col-span-4">
        <div className="flex items-center justify-between px-8 pt-10 sm:px-10 lg:px-12">
          <textarea
            placeholder="Title"
            defaultValue={content?.title}
            onChange={(e) => {
              debouncedSetTitle(e.target.value)
            }}
            className="w-full resize-none appearance-none place-items-center overflow-hidden bg-transparent text-2xl font-bold focus:outline-none lg:text-3xl xl:text-4xl"
          />
        </div>
        <Editor
          key={initialContent}
          onDebouncedUpdate={handleEditorUpdate}
          debounceDuration={750}
          disableLocalStorage
          defaultValue={initialContent ? initialContent : ""}
          className="-mt-10"
        />
      </div>

      <div className="order-1 col-span-6 grid gap-4 lg:order-2 lg:col-span-2">
        <EditContentOptions content={content} setSaveStatus={setSaveStatus} />
      </div>
    </div>
  )
}
