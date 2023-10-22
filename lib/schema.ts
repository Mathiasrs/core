import { z } from "zod"

export const contentSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  contentId: z.string(),
})

export type Content = z.infer<typeof contentSchema>

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
  image: z.string(),
})

export type User = z.infer<typeof userSchema>
