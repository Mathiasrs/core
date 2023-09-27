import { z } from "zod"

export const ContentValidator = z.object({
  id: z.string(),
  contentId: z.string(),
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters long",
    })
    .max(128, {
      message: "Title must be less than 128 characters long",
    }),
  content: z.any(),
})

export type ContentCreationRequest = z.infer<typeof ContentValidator>
