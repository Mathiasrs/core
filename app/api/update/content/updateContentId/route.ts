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

    const { id, contentId } = payload

    if (!session) {
      return NextResponse.next({
        status: 401,
      })
    }

    await prisma.content.update({
      where: { id: id },

      data: {
        contentId,
      },
    })

    return NextResponse.json("OK")
  } catch (error) {
    console.error("Error updating contentId:", error)
    return NextResponse.json(
      {
        message: "An error occurred while updating contentId.",
      },
      { status: 500 },
    )
  }
}
