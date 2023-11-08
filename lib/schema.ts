import { z } from "zod"

export const localizationSchema = z.object({
  locale: z.string(),
  title: z.string(),
  description: z.string().optional(),
  content: z.any(), // Use a more specific schema if possible for the content field
  contentId: z.string(),
})

export const contentSchema = z.object({
  id: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  contentId: z.string(),
  localizations: z.array(localizationSchema), // This is how you include localizations
})

export type Content = z.infer<typeof contentSchema>

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
  image: z.string(),
})

export type User = z.infer<typeof userSchema>
