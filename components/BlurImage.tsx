"use client"

import { useState } from "react"

// Next
import Image from "next/image"

// Libraries
import { cn } from "@/lib/utils"

export default function BlurImage({ data }: { data: any }) {
  const [isLoading, setLoading] = useState(true)

  return (
    <div className="relative">
      <Image
        src={data.src}
        alt={data.alt || "content image"}
        width={600}
        height={300}
        className={cn(
          "w-full rounded-xl object-contain shadow-md ring ring-zinc-100 duration-700 ease-in-out group-hover:opacity-75 dark:ring-zinc-900",
          isLoading
            ? "scale-110 blur-xl grayscale"
            : "scale-100 blur-0 grayscale-0",
        )}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  )
}
