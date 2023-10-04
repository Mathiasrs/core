import { z } from "zod"

export const ContentValidator = z.object({
  id: z.string(),
  content: z.any(),
})

export type ContentCreationRequest = z.infer<typeof ContentValidator>

export const TitleValidator = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
})

export type TitleCreationRequest = z.infer<typeof TitleValidator>

export const IsPublishedValidator = z.object({
  id: z.string(),
  isPublished: z.boolean(),
})

export type IsPublishedCreationRequest = z.infer<typeof IsPublishedValidator>

export const LabelValidator = z.object({
  id: z.string(),
  label: z.string(),
})

export type LabelCreationRequest = z.infer<typeof LabelValidator>

export const ContentIdValidator = z.object({
  id: z.string(),
  contentId: z.string(),
})

export type ContentIdCreationRequest = z.infer<typeof ContentIdValidator>

export const DescriptionValidator = z.object({
  id: z.string(),
  description: z.string(),
})

export type DescriptionCreationRequest = z.infer<typeof DescriptionValidator>
