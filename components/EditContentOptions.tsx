"use client"

// Mutations
import { useUpdateIsPublished } from "@/actions/mutations/content/useUpdateIsPublished"

// Libraries
import { RocketIcon } from "@radix-ui/react-icons"

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

export default function EditContentOptions({ content, setSaveStatus }: any) {
  const [isChecked, setIsChecked] = useState(false)
  const updateIsPublished = useUpdateIsPublished(content?.slug, setSaveStatus)

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content details</CardTitle>
        <CardDescription>
          Provide additional details for extra context.
        </CardDescription>
      </CardHeader>

      <CardContent>
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
      </CardContent>
    </Card>
  )
}
