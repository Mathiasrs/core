import { z } from "zod"

export const ContentCreationValidator = z.object({
  contentId: z.string().max(12, {
    message: "Content ID can maximum be 12 characters.",
  }),
  title: z
    .string()
    .min(10, {
      message: "Title must be at least 10 characters.",
    })
    .max(60, {
      message: "Description can maximum be 60 characters.",
    }),
  slug: z.string().optional(),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(140, {
      message: "Description can maximum be 140 characters.",
    })
    .optional(),
})

export type ContentCreationRequest = z.infer<typeof ContentCreationValidator>

export const ContentDeleteValidator = z.object({
  id: z.string(),
})

export type ContentDeleteRequest = z.infer<typeof ContentDeleteValidator>

export const ContentValidator = z.object({
  id: z.string(),
  content: z.any(),
  locale: z.string(),
  contentId: z.string(),
})

export type ContentUpdateRequest = z.infer<typeof ContentValidator>

export const TitleValidator = z.object({
  id: z.string(),
  title: z.string(),
  locale: z.string(),
  contentId: z.string(),
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
  locale: z.any(),
})

export type DescriptionUpdateRequest = z.infer<typeof DescriptionValidator>
