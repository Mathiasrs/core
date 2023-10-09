"use client"

import { useEffect, useState } from "react"

// Mutations
import { useUpdateIsPublished } from "@/actions/mutations/content/useUpdateIsPublished"
import { useUpdateContentId } from "@/app/actions/mutations/content/useUpdateContentId"
import { useUpdatePriority } from "@/app/actions/mutations/content/useUpdatePriority"
import { useUpdateStatus } from "@/app/actions/mutations/content/useUpdateStatus"
import { useUpdateDescription } from "@/app/actions/mutations/content/useUpdateDescription"

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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Label } from "@radix-ui/react-label"
import { Input, InputDescription } from "@/components/ui/input"
import { priorities, statuses } from "@/components/data"
import { Textarea } from "@/components/ui/textarea"

export default function EditContentOptions({ content, setSaveStatus }: any) {
  const [isChecked, setIsChecked] = useState(false)
  const [priority, setPriority] = useState("")
  const [status, setStatus] = useState("")
  const updateIsPublished = useUpdateIsPublished(content?.slug, setSaveStatus)
  const updateContentId = useUpdateContentId()
  const updatePriority = useUpdatePriority()
  const updateStatus = useUpdateStatus()
  const updateDescription = useUpdateDescription()

  const debouncedUpdateContentId = useDebouncedCallback((contentId) => {
    handleUpdateContentId(contentId)
  }, 750)

  const debouncedUpdateDescription = useDebouncedCallback((description) => {
    handleUpdateDescription(description)
  }, 750)

  useEffect(() => {
    if (content?.isPublished !== undefined) {
      setIsChecked(content.isPublished)
    }
  }, [content?.isPublished])

  useEffect(() => {
    if (content?.priority) {
      setPriority(content.priority)
    }

    if (content?.status) {
      setStatus(content.status)
    }
  }, [content])

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

  const handleUpdatePriority = (priority: string) => {
    const payload = {
      id: content.id,
      priority,
    }

    updatePriority.mutate(payload)
  }

  const handleUpdateStatus = (status: string) => {
    const payload = {
      id: content.id,
      status,
    }

    updateStatus.mutate(payload)
  }

  const handleUpdateDescription = (description: string) => {
    const payload = {
      id: content.id,
      description,
    }

    updateDescription.mutate(payload)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content details</CardTitle>
        <CardDescription>
          Provide additional details for extra context.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6">
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

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="picture">Priority</Label>
          <Select
            onValueChange={(value) => {
              handleUpdatePriority(value)
            }}
            value={priority}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Priorities</SelectLabel>
                {priorities.map((item: any) => (
                  <SelectItem
                    key={item?.value}
                    value={item?.value}
                    className="flex items-center"
                  >
                    <div className="flex items-center justify-center">
                      {item.icon && (
                        <item.icon className="mr-2 inline-flex h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="inline-flex items-center">
                        {item?.label}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="picture">Status</Label>
          <Select
            onValueChange={(value) => {
              handleUpdateStatus(value)
            }}
            value={status}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Statuses</SelectLabel>
                {statuses.map((item: any) => (
                  <SelectItem
                    key={item?.value}
                    value={item?.value}
                    onClick={() => {
                      handleUpdateStatus(item?.value)
                    }}
                    className="flex items-center"
                  >
                    <div className="flex items-center justify-center">
                      {item.icon && (
                        <item.icon className="mr-2 inline-flex h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="inline-flex items-center">
                        {item?.label}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="picture">Description</Label>
          <Textarea
            placeholder="Provide a short description of the content."
            defaultValue={content?.description}
            onChange={(e) => debouncedUpdateDescription(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
