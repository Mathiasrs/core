"use client"

import { useEffect, useState } from "react"

// Next
import { redirect } from "next/navigation"
import Link from "next/link"

// Auth
import { useSession } from "next-auth/react"

// Queries
import useContentByContentIdEdit from "@/actions/queries/content/useContentByContentIdEdit"
import usePermissions from "@/actions/queries/user/usePermissions"
import useLocales from "@/actions/queries/tenant/useLocales"

// Mutations
import { useUpdateTitle } from "@/app/actions/mutations/content/useUpdateTitle"
import { useUpdateContent } from "@/app/actions/mutations/content/useUpdateContent"

// States
import { useSelectedLocale } from "@/app/actions/states/useSelectedLocale"

// Libraries
import { Editor } from "novel"
import { useDebouncedCallback } from "use-debounce"
import { FaArrowCircleLeft } from "react-icons/fa"

// Components
import EditorSkeleton from "@/components/ui/skeletons/EditorSkeleton"
import EditContentOptions from "@/components/EditContentOptions"
import Message from "@/components/Message"

type pageProps = {
  params: {
    contentId: string
  }
}

export default function Page({ params }: pageProps) {
  const session = useSession()

  if (!session) {
    redirect("/")
  }

  // State variables
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [editorContent, setEditorContent] = useState("")
  const [saveStatus, setSaveStatus] = useState("Saved")

  // Locale and permissions
  const { data: locales, isLoading: isLoadingLocales } = useLocales()
  const { data: permissions } = usePermissions()
  const { selectedLocale: locale } = useSelectedLocale(locales)

  const contentId = decodeURIComponent(params.contentId)
  const { data: content, isLoading } = useContentByContentIdEdit(contentId)

  const localeContent = content?.localizations?.filter(
    (item: any) => item.locale === locale.code,
  )[0]

  useEffect(() => {
    if (localeContent) {
      setTitle(localeContent.title)
      setDescription(localeContent.description)
      setEditorContent(localeContent.content)
    }
  }, [localeContent])

  const debouncedSetTitle = useDebouncedCallback((title) => {
    handleUpdateTitle(title)
  }, 750)

  const updateTitleMutation = useUpdateTitle(setSaveStatus, contentId, locale)

  const handleUpdateTitle = async (title: string) => {
    setSaveStatus("Saving...")
    const payload = {
      id: content.id,
      title: title,
      locale: locale.code,
      contentId: content.id,
    }
    updateTitleMutation.mutate(payload)
  }

  const updateContentMutation = useUpdateContent(
    setSaveStatus,
    contentId,
    locale,
  )

  const handleEditorUpdate = async (editor: any) => {
    setSaveStatus("Saving...")
    if (editor) {
      const state = editor.state
      const json = state.doc.toJSON()
      const payload = {
        id: content.id,
        content: json,
        locale: locale.code,
        contentId: content.id,
      }
      updateContentMutation.mutate(payload)
    }
  }

  if (isLoading || isLoadingLocales) return <EditorSkeleton />

  return (
    <>
      {permissions?.userCanEditContent ? (
        <div className="grid grid-cols-6 items-start gap-6">
          <div className="col-span-6">
            <Link
              href="/content"
              className="flex w-fit items-center gap-2 pl-4 text-zinc-900 hover:opacity-80 dark:text-white"
            >
              <FaArrowCircleLeft className="h-4 w-4" />
              <span>Go back</span>
            </Link>
          </div>

          <div className="prose prose-stone dark:prose-invert relative order-2 col-span-6 rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 lg:order-1 lg:col-span-4">
            <div className="flex items-center justify-between px-8 pt-10 sm:px-10 lg:px-12">
              <textarea
                placeholder="Title"
                defaultValue={title || ""}
                onChange={(e) => {
                  debouncedSetTitle(e.target.value)
                }}
                className="mt-4 w-full resize-none appearance-none place-items-center overflow-hidden bg-transparent text-2xl font-bold focus:outline-none lg:text-3xl xl:text-4xl"
              />

              <div className="absolute right-5 top-5 z-10 mb-5 rounded-lg bg-zinc-100 px-2 py-1 text-sm text-zinc-400 dark:bg-zinc-800">
                {saveStatus}
              </div>
            </div>

            <div className="relative w-full">
              <Editor
                key={locale.code}
                onDebouncedUpdate={handleEditorUpdate}
                debounceDuration={750}
                disableLocalStorage
                defaultValue={editorContent || ""}
                className="-mt-10"
              />
            </div>
          </div>

          <div className="order-1 col-span-6 grid gap-4 lg:order-2 lg:col-span-2">
            <EditContentOptions
              description={description || ""}
              content={content}
              locales={locales}
              isLoadingLocales={isLoadingLocales}
            />
          </div>
        </div>
      ) : (
        <Message
          category="Access denied"
          title="You do not have access to this page."
          description="If you believe you should have access to this page, please contact your manager."
        />
      )}
    </>
  )
}
