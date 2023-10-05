"use client"

// Next
import Link from "next/link"

// Auth
import { useSession } from "next-auth/react"

// Mutations
import { useUpdateTitle } from "@/app/actions/mutations/content/useUpdateTitle"
import { useUpdateContent } from "@/app/actions/mutations/content/useUpdateContent"

// Libraries
import { Editor } from "novel"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

// Helpers
import { generateSlug } from "@/lib/helpers/generateSlug"
import { Badge } from "@/components/ui/badge"

// Components
import useContentBySlug from "@/app/actions/queries/content/useContentBySlug"
import EditorSkeleton from "@/components/ui/skeletons/EditorSkeleton"
import EditContentOptions from "@/components/EditContentOptions"
import { FaArrowCircleLeft } from "react-icons/fa"
import { Separator } from "@/components/ui/separator"

type pageProps = {
  params: {
    slug: string
  }
}

export default function Page({ params }: pageProps) {
  const [initialContent, setInitialContent] = useState("")
  const [saveStatus, setSaveStatus] = useState("")

  const { data: session } = useSession()
  const slug = params.slug
  const { data: content, isLoading } = useContentBySlug({ session, slug })

  const debouncedSetTitle = useDebouncedCallback((title) => {
    handleUpdateTitle(title)
  }, 750)

  const updateTitleMutation = useUpdateTitle(slug, setSaveStatus)
  const updateContentMutation = useUpdateContent(slug, setSaveStatus)

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
      <div className="prose prose-stone dark:prose-invert relative col-span-6 rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 md:col-span-4">
        <div className="flex items-center justify-between px-8 pt-10 sm:px-10 md:px-12">
          <textarea
            placeholder="Title"
            defaultValue={content?.title}
            onChange={(e) => {
              debouncedSetTitle(e.target.value)
            }}
            className="w-full resize-none appearance-none place-items-center overflow-hidden bg-transparent text-3xl font-bold focus:outline-none lg:text-5xl"
          />
        </div>
        <Editor
          onDebouncedUpdate={handleEditorUpdate}
          debounceDuration={750}
          disableLocalStorage
          defaultValue={initialContent ? initialContent : ""}
          className="-mt-16"
        />
      </div>
      <div className="col-span-6 grid gap-4 md:col-span-2">
        <EditContentOptions content={content} setSaveStatus={setSaveStatus} />
      </div>
    </div>
  )
}
