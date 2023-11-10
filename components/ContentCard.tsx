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
import Views from "./Views"

export default function ContentCard({ data, locale }: any) {
  const matchedLabel = labels.find(
    (label) => label.label.toLowerCase() === data?.label.toLowerCase(),
  )

  const badgeClassNames = matchedLabel ? matchedLabel.classNames : ""

  const defaultLocale = locale !== undefined ? locale : "en-US"

  return (
    <Link href={`kbase/${defaultLocale}/${data?.contentId}`}>
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
            <span className="uppercase">{data?.contentId}</span> -{" "}
            <Views contentId={data.contentId} type="article" />
          </CardDescription>
        </CardFooter>
      </Card>
    </Link>
  )
}
