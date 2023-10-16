"use client"

import { useEffect, useState } from "react"

// Next
import Link from "next/link"

// Queries
import useContentByContentId from "@/actions/queries/content/useContentByContentId"

// Libraries
import { Editor } from "novel"
import { FaArrowCircleLeft } from "react-icons/fa"
import { cn } from "@/lib/utils"

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@radix-ui/react-label"
import { Textarea } from "@/components/ui/textarea"
import { labels } from "@/components/data"
import { Input, InputDescription } from "@/components/ui/input"
import ContentViewerSkeleton from "@/components/ui/skeletons/ContentViewerSkeleton"
import { Badge } from "@/components/ui/badge"

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

  const matchedLabel = labels.find(
    (label) => label?.label?.toLowerCase() === content?.label?.toLowerCase(),
  )

  const badgeClassNames = matchedLabel ? matchedLabel.classNames : ""

  if (isLoading) return <ContentViewerSkeleton />

  return (
    <div className="grid grid-cols-6 items-start gap-6">
      <div className="col-span-6 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Link
            href="/kbase"
            className="flex items-center gap-2 text-zinc-900 hover:opacity-80 dark:text-white"
          >
            <FaArrowCircleLeft className="h-4 w-4" />
            <span>Go back</span>
          </Link>
          -{" "}
          <h3 className="text-base font-semibold leading-6 text-zinc-900 dark:text-white">
            Content viewer
          </h3>
        </div>
      </div>

      <div className="prose prose-stone dark:prose-invert relative order-2 col-span-6 rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 lg:order-1 lg:col-span-4">
        <div className="flex items-center justify-between px-8 pt-10 sm:px-10 lg:px-12">
          <h2 className="w-full place-items-center bg-transparent text-2xl font-bold lg:text-3xl xl:text-4xl">
            {content?.title}
          </h2>
          <Badge
            className={cn("mb-2 uppercase", badgeClassNames)}
            variant="outline"
          >
            {content?.label}
          </Badge>
        </div>

        <Editor
          key={initialContent}
          disableLocalStorage
          defaultValue={initialContent ? initialContent : ""}
          editorProps={{ editable: () => false }}
          className="-mt-10"
        />
      </div>

      <div className="order-1 col-span-6 grid gap-4 lg:order-2 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Content details</CardTitle>
            <CardDescription>
              Provide additional details for extra context.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="picture">Content ID</Label>
              <Input type="text" disabled defaultValue={content.contentId} />
              <InputDescription>
                Content ID gives you a quick way of finding your content during
                search.
              </InputDescription>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="picture">Description</Label>
              <Textarea defaultValue={content.description} disabled />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
