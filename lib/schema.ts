import { z } from "zod"

export const contentSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export type Content = z.infer<typeof contentSchema>
