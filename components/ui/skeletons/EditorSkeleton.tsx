import React from "react"

// Next
import Link from "next/link"

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Switch } from "@/components/ui/switch"

import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@radix-ui/react-label"
import { Input, InputDescription } from "@/components/ui/input"

import { FaArrowCircleLeft } from "react-icons/fa"
import { Textarea } from "../textarea"
import { Skeleton } from "../skeleton"
import { RocketIcon } from "@radix-ui/react-icons"

export default function EditorSkeleton() {
  return (
    <div className="grid grid-cols-6 items-start gap-6">
      <div className="col-span-6 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Link
            href="/content"
            className="flex items-center gap-2 text-zinc-900 hover:opacity-80 dark:text-white"
          >
            <FaArrowCircleLeft className="h-4 w-4" />
            <span>Go back</span>
          </Link>
          -{" "}
          <h3 className="text-base font-semibold leading-6 text-zinc-900 dark:text-white">
            Content editor
          </h3>
        </div>
      </div>

      <div className="prose prose-stone dark:prose-invert relative order-2 col-span-6 rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 lg:order-1 lg:col-span-4">
        <div className="flex items-center justify-between px-8 pt-10 sm:px-10 md:px-12">
          <textarea
            placeholder="Loading..."
            disabled
            className="w-full resize-none appearance-none place-items-center overflow-hidden bg-transparent text-3xl font-bold focus:outline-none lg:text-5xl"
          />
        </div>
        <div className="grid gap-4 p-8">
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full px-6" />
          ))}
        </div>
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
            <div className="flex items-center space-x-4 rounded-md border p-4 dark:border-zinc-800">
              <RocketIcon />

              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Publication</p>
                <p className="text-sm text-muted-foreground">
                  Publish content to users.
                </p>
              </div>
              <Switch disabled />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="picture">Content ID</Label>
              <Input type="text" placeholder="HT202020" disabled />
              <InputDescription>
                Provide an ID for better handling and finding content.
              </InputDescription>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="picture">Priority</Label>
              <Select disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
              </Select>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="picture">Status</Label>
              <Select disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
              </Select>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="picture">Description</Label>
              <Textarea
                placeholder="Provide a short description of the content."
                disabled
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
