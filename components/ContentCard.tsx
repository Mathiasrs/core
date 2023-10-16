// Next
import Link from "next/link"

// Libraries
import { format } from "date-fns"

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"

import { labels } from "@/components/data"

export default function ContentCard({ data }: any) {
  const matchedLabel = labels.find(
    (label) => label.label.toLowerCase() === data?.label.toLowerCase(),
  )

  const badgeClassNames = matchedLabel ? matchedLabel.classNames : ""

  return (
    <Link href={`kbase/${data?.contentId}`}>
      <Card className="flex h-full flex-col justify-between">
        <div className="flex-grow">
          <CardHeader className="font-semibold">
            {data?.title}

            <Badge
              className={cn("mt-2 w-fit uppercase", badgeClassNames)}
              variant="outline"
            >
              {data?.label}
            </Badge>
          </CardHeader>
          <CardContent>
            <CardDescription>{data?.description}</CardDescription>
          </CardContent>
        </div>

        <CardFooter>
          <CardDescription>
            {data?.updatedAt ? format(new Date(data?.updatedAt), "PPP") : ""} -{" "}
            <span className="uppercase">{data?.contentId}</span>
          </CardDescription>
        </CardFooter>
      </Card>
    </Link>
  )
}
