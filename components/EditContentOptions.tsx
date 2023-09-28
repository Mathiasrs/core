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

export default function EditContentOptions({ content }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content details</CardTitle>
        <CardDescription>
          Provide additional details for extra context.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <RocketIcon />

          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Publication</p>
            <p className="text-sm text-muted-foreground">
              Publish content to users.
            </p>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  )
}
