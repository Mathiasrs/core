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
