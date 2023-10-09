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

export default function ContentCard({ data }: any) {
  return (
    <Link href={`kbase/${data?.contentId}`}>
      <Card className="flex h-full flex-col justify-between">
        <div className="flex-grow">
          <CardHeader>{data?.title}</CardHeader>
          <CardContent>
            <Badge className="mb-2 uppercase" variant="outline">
              {data?.label}
            </Badge>
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
