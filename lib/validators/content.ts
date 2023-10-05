import { z } from "zod"

export const ContentCreationValidator = z.object({
  contentId: z.string(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
})

export type ContentCreationRequest = z.infer<typeof ContentCreationValidator>

export const ContentValidator = z.object({
  id: z.string(),
  content: z.any(),
})

export type ContentUpdateRequest = z.infer<typeof ContentValidator>

export const TitleValidator = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
})

export type TitleUpdateRequest = z.infer<typeof TitleValidator>

export const IsPublishedValidator = z.object({
  id: z.string(),
  isPublished: z.boolean(),
})

export type IsPublishedUpdateRequest = z.infer<typeof IsPublishedValidator>

export const LabelValidator = z.object({
  id: z.string(),
  label: z.string(),
})

export type LabelUpdateRequest = z.infer<typeof LabelValidator>

export const ContentIdValidator = z.object({
  id: z.string(),
  contentId: z.string(),
})

export type ContentIdUpdateRequest = z.infer<typeof ContentIdValidator>

export const PriorityValidator = z.object({
  id: z.string(),
  priority: z.string(),
})

export type PriorityUpdateRequest = z.infer<typeof PriorityValidator>

export const StatusValidator = z.object({
  id: z.string(),
  status: z.string(),
})

export type StatusUpdateRequest = z.infer<typeof StatusValidator>

export const DescriptionValidator = z.object({
  id: z.string(),
  description: z.string(),
})

export type DescriptionUpdateRequest = z.infer<typeof DescriptionValidator>
