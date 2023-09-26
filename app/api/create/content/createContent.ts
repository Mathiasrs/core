// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "app/api/auth/[...nextauth]/route"

// Libraries
import prisma from "@/lib/prisma"
import { ContentValidator } from "@/lib/validators/content"
import { z } from "zod"

export async function POST(req: Request) {
  const session = (await getServerSession(authOptions)) as any

  try {
    const body = await req.json()

    const { contentId, type, title, content, status, label, priority } =
      ContentValidator.parse(body)

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const subscription = await prisma.content.findFirst({
      where: {
        contentId,
        authorId: session.user.id,
      },
    })

    if (!subscription) {
      return new Response("Subscribe to post", { status: 403 })
    }

    await prisma.content.create({
      data: {
        contentId,
        type,
        title,
        content,
        status,
        label,
        priority,
        author: {
          connect: {
            id: session.user.id,
          },
        },
      },
    })

    return new Response("OK")
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response("Could not post to subreddit at this time. Please try later", {
      status: 500,
    })
  }
}
