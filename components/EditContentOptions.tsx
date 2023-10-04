"use client"

// Mutations
import { useUpdateIsPublished } from "@/actions/mutations/content/useUpdateIsPublished"
import { useUpdateContentId } from "@/app/actions/mutations/content/useUpdateContentId"

// Libraries
import { RocketIcon } from "@radix-ui/react-icons"
import { useDebouncedCallback } from "use-debounce"

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import { Label } from "@radix-ui/react-label"
import { Input, InputDescription } from "./ui/input"

export default function EditContentOptions({ content, setSaveStatus }: any) {
  const [isChecked, setIsChecked] = useState(false)
  const updateIsPublished = useUpdateIsPublished(content?.slug, setSaveStatus)
  const updateContentId = useUpdateContentId()

  const debouncedUpdateContentId = useDebouncedCallback((contentId) => {
    handleUpdateContentId(contentId)
  }, 750)

  useEffect(() => {
    if (content?.isPublished !== undefined) {
      setIsChecked(content.isPublished)
    }
  }, [content?.isPublished])

  const handleToggle = () => {
    const newStatus = !isChecked
    setIsChecked(newStatus)

    const payload = {
      id: content.id,
      isPublished: newStatus,
    }

    updateIsPublished.mutate(payload)
  }

  const handleUpdateContentId = (contentId: string) => {
    const payload = {
      id: content.id,
      contentId,
    }

    updateContentId.mutate(payload)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content details</CardTitle>
        <CardDescription>
          Provide additional details for extra context.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4 dark:border-zinc-800">
          <RocketIcon />

          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Publication</p>
            <p className="text-sm text-muted-foreground">
              Publish content to users.
            </p>
          </div>
          <Switch checked={isChecked} onCheckedChange={() => handleToggle()} />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="picture">Content ID</Label>
          <Input
            type="text"
            placeholder="HT202020"
            defaultValue={content?.contentId}
            onChange={(e) => debouncedUpdateContentId(e.target.value)}
          />
          <InputDescription>
            Provide an ID for better handling and finding content.
          </InputDescription>
        </div>
      </CardContent>
    </Card>
  )
}
