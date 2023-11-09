"use client"

import { useEffect, useState } from "react"

// Next
import { useRouter } from "next/navigation"

// States
import { useSelectedLocale } from "@/actions/states/useSelectedLocale"

// Mutations
import { useUpdateIsPublished } from "@/actions/mutations/content/useUpdateIsPublished"
import { useUpdateContentId } from "@/app/actions/mutations/content/useUpdateContentId"
import { useUpdatePriority } from "@/app/actions/mutations/content/useUpdatePriority"
import { useUpdateStatus } from "@/app/actions/mutations/content/useUpdateStatus"
import { useUpdateDescription } from "@/app/actions/mutations/content/useUpdateDescription"

// Types
import { Locale } from "types/typings"

// Libraries
import { RocketIcon } from "@radix-ui/react-icons"
import { useDebouncedCallback } from "use-debounce"
import { Label } from "@radix-ui/react-label"

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

import { Input, InputDescription } from "@/components/ui/input"
import { priorities, statuses } from "@/components/data"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export default function EditContentOptions({
  description,
  content,
  locales,
  isLoadingLocales,
  locale,
}: any) {
  const router = useRouter()

  const [isChecked, setIsChecked] = useState(false)
  const [priority, setPriority] = useState("")
  const [status, setStatus] = useState("")
  const [contentId, setContentId] = useState(content?.contentId)

  const { selectedLocale, setSelectedLocale } = useSelectedLocale(locales)

  const debouncedUpdateContentId = useDebouncedCallback((contentId) => {
    setContentId(contentId)
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

  const updateIsPublished = useUpdateIsPublished(contentId)

  const handleToggle = () => {
    const newStatus = !isChecked
    setIsChecked(newStatus)

    const payload = {
      id: content.id,
      isPublished: newStatus,
    }

    updateIsPublished.mutate(payload)
  }

  const updateContentId = useUpdateContentId(contentId)

  const handleUpdateContentId = (contentId: string) => {
    const payload = {
      id: content.id,
      contentId,
    }

    updateContentId.mutate(payload)
  }

  const updatePriority = useUpdatePriority(contentId)

  const handleUpdatePriority = (priority: string) => {
    const payload = {
      id: content.id,
      priority,
    }

    updatePriority.mutate(payload)
  }

  const updateStatus = useUpdateStatus(contentId)

  const handleUpdateStatus = (status: string) => {
    const payload = {
      id: content.id,
      status,
    }

    updateStatus.mutate(payload)
  }

  const updateDescription = useUpdateDescription(contentId, locale)

  const handleUpdateDescription = (description: string) => {
    const payload = {
      id: content.id,
      description,
      locale: locale.code,
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
            className={cn(updateContentId.isPending ? "animate-pulse" : "")}
          />
          <InputDescription>
            Provide an ID for better handling and finding content.
          </InputDescription>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="picture">Description</Label>
          <Textarea
            placeholder="Provide a short description of the content."
            defaultValue={description}
            onChange={(e) => debouncedUpdateDescription(e.target.value)}
            className={cn(updateDescription.isPending ? "animate-pulse" : "")}
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="picture">Priority</Label>
          <div className={cn(updatePriority.isPending ? "animate-pulse" : "")}>
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
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="picture">Status</Label>
          <div className={cn(updateStatus.isPending ? "animate-pulse" : "")}>
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
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="language-select">Language</Label>
          <div className={cn(isLoadingLocales ? "animate-pulse" : "")}>
            <Select
              disabled={isLoadingLocales}
              onValueChange={(value) => {
                const newLocale = locales?.find(
                  (locale: Locale) => locale.code === value,
                )
                if (newLocale) {
                  setSelectedLocale(newLocale)
                  router.refresh()
                }
              }}
              value={selectedLocale?.code || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    isLoadingLocales ? "Loading..." : "Select language"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Locales</SelectLabel>
                  {locales?.map((locale: Locale) => (
                    <SelectItem
                      key={locale.id}
                      value={locale.code}
                      className="flex items-center"
                    >
                      {locale.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
