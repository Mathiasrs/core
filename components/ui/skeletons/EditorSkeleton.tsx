import React from "react"

// Components
import { Button } from "@/components/ui/button"

export default function EditorSkeleton() {
  return (
    <div className="flex animate-pulse flex-col items-start gap-6">
      <div className="border-b border-gray-200 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            Content editor
          </h3>
        </div>
      </div>

      <div className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <div id="article-form" className="w-fit">
          <div className="prose prose-stone dark:prose-invert">
            <textarea
              placeholder="Title"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            />
            <div id="editor" className="min-h-[500px]" />
            <p className="text-sm text-zinc-500">
              Use{" "}
              <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                Tab
              </kbd>{" "}
              to open the command menu.
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end">
        <Button
          disabled
          type="submit"
          className="w-full"
          form="subreddit-post-form"
        >
          Update
        </Button>
      </div>
    </div>
  )
}
