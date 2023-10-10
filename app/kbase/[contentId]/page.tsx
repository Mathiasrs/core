"use client"

import { useEffect, useState } from "react"

// Queries
import useContentByContentId from "@/actions/queries/content/useContentByContentId"

// Libraries
import { Editor } from "novel"

type pageProps = {
  params: {
    contentId: string
  }
}

export default function ContentPage({ params }: pageProps) {
  const [initialContent, setInitialContent] = useState("")

  const contentId = params.contentId
  const { data: content, isLoading } = useContentByContentId(contentId)

  useEffect(() => {
    if (content?.content) {
      setInitialContent(content?.content)
    }
  }, [content])

  if (isLoading) return "isLoading"

  return (
    <div className="grid grid-cols-6 items-start gap-6">
      <div className="prose prose-stone dark:prose-invert relative order-2 col-span-6 rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 lg:order-1 lg:col-span-4">
        <div className="flex items-center justify-between px-8 pt-10 sm:px-10 lg:px-12">
          <h2 className="w-full place-items-center bg-transparent text-3xl font-bold  lg:text-4xl xl:text-5xl">
            {content?.title}
          </h2>
        </div>

        <Editor
          defaultValue={initialContent ? initialContent : ""}
          editorProps={{ editable: () => false }}
          className="-mt-10"
        />
      </div>

      <div className="order-1 col-span-6 grid gap-4 lg:order-2 lg:col-span-2"></div>
    </div>
  )
}
