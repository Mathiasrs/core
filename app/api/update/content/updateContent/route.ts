import { NextRequest, NextResponse } from "next/server"

// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "app/api/auth/[...nextauth]/route"

// Libraries
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = (await getServerSession(authOptions)) as any

  try {
    const { payload }: any = JSON.parse(await request.text())

    const { id, content, locale, contentId } = payload

    if (!session) {
      return NextResponse.next({
        status: 401,
      })
    }

    await prisma.localizedContent.upsert({
      where: { contentId_locale: { contentId: id, locale: locale } },

      create: {
        content,
        locale,
        contentRef: {
          connect: {
            id: contentId,
          },
        },
      },

      update: {
        content,

        revisions: {
          create: {
            revisionContent: content,
            createdAt: new Date(),
            createdBy: {
              connect: { id: session.user.id },
            },
          },
        },
      },
    })

    return NextResponse.json("OK")
  } catch (error) {
    console.error("Error updating content:", error)
    return NextResponse.json(
      {
        message: "An error occurred while updating content.",
      },
      { status: 500 },
    )
  }
}
