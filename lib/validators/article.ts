import { z } from "zod"

export const ArticleValidator = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters long",
    })
    .max(128, {
      message: "Title must be less than 128 characters long",
    }),
  contentId: z.string(),
  content: z.any(),
})

export type ArticleCreationRequest = z.infer<typeof ArticleValidator>
