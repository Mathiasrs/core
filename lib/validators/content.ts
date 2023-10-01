import { z } from "zod"

export const ContentValidator = z.object({
  id: z.string(),
  content: z.any(),
})

export type ContentCreationRequest = z.infer<typeof ContentValidator>
