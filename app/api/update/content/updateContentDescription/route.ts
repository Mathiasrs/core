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

    const { id, description, locale } = payload

    if (!session) {
      return NextResponse.next({
        status: 401,
      })
    }
    await prisma.localizedContent.upsert({
      where: { contentId_locale: { contentId: id, locale: locale } },

      create: {
        description,
        locale,
        contentRef: {
          connect: {
            id: id,
          },
        },
      },

      update: {
        description,
      },
    })

    return NextResponse.json("OK")
  } catch (error) {
    console.error("Error updating description:", error)
    return NextResponse.json(
      {
        message: "An error occurred while updating description.",
      },
      { status: 500 },
    )
  }
}
