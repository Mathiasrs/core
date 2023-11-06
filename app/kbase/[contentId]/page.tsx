"use client"

import { useEffect, useState } from "react"

// Next
import { redirect } from "next/navigation"
import Link from "next/link"

// Auth
import { useSession } from "next-auth/react"

// Queries
import useContentByContentId from "@/actions/queries/content/useContentByContentId"
import usePermissions from "@/actions/queries/user/usePermissions"

// Libraries
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
import Views from "@/components/Views"
import ContentRender from "@/components/ContentRender"
import Message from "@/components/Message"

type pageProps = {
  params: {
    contentId: string
  }
}

export default function ContentPage({ params }: pageProps) {
  const session = useSession()

  if (!session) {
    redirect("/")
  }

  const { data: permissions } = usePermissions()

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
    <>
      {permissions?.userCanViewContent ? (
        <div className="grid grid-cols-6 items-start gap-6">
          <div className="col-span-6">
            <Link
              href="/kbase"
              className="flex w-fit items-center gap-2 pl-4 text-zinc-900 hover:opacity-80 dark:text-white"
            >
              <FaArrowCircleLeft className="h-4 w-4" />
              <span>Go back</span>
            </Link>
          </div>

          {content.isPublished ? (
            <>
              <div className="prose prose-stone dark:prose-invert relative order-2 col-span-6 rounded-xl border border-zinc-200 bg-white p-4 text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 md:p-6 lg:order-1 lg:col-span-4 lg:p-8">
                <div className="mb-6 grid items-center justify-between">
                  <h2 className="w-full place-items-center bg-transparent text-3xl font-bold lg:text-4xl xl:text-5xl">
                    {content?.title}
                  </h2>
                  <Badge
                    className={cn("mt-4 w-fit uppercase", badgeClassNames)}
                    variant="outline"
                  >
                    {content?.label}
                  </Badge>
                </div>

                <ContentRender data={initialContent} />
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
                      <Input
                        type="text"
                        disabled
                        defaultValue={content.contentId}
                      />
                      <InputDescription>
                        Content ID gives you a quick way of finding your content
                        during search.
                      </InputDescription>
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="picture">Description</Label>
                      <Textarea defaultValue={content.description} disabled />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="picture">Views</Label>
                      <Views
                        contentId={content.contentId}
                        type="article"
                        isInInput
                      />
                      <InputDescription>
                        The amount of views often provide an indicator of how
                        frequently the content is used and the importance of the
                        content.
                      </InputDescription>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="col-span-6 mt-20 text-center">
              <h2 className="text-base font-semibold uppercase tracking-wide text-green-600">
                Content
              </h2>
              <p className="mt-1 text-4xl font-extrabold text-zinc-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                Content not available yet.
              </p>
              <p className="mx-auto mt-5 max-w-xl text-xl text-zinc-500 dark:text-zinc-400">
                You are trying to view content that are not available yet. If
                that is a mistake, please contact the content owner or
                administrator.
              </p>
            </div>
          )}
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
