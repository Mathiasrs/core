import { NextRequest, NextResponse } from "next/server"

// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "app/api/auth/[...nextauth]/route"

// Libraries
import prisma from "@/lib/prisma"

type contentProps = {
  id: string
  isPublished: boolean
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = (await getServerSession(authOptions)) as any

  try {
    const { id, isPublished }: contentProps = JSON.parse(await request.text())

    if (!session) {
      return NextResponse.next({
        status: 401,
      })
    }

    await prisma.content.update({
      where: { id: id },

      data: {
        isPublished,
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
