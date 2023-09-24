import { NextRequest, NextResponse } from "next/server"

// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "app/api/auth/[...nextauth]/route"

// Libraries
import prisma from "@/lib/prisma"
import { Session } from "@/typings"

interface User {
  id: string
  image: string
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = (await getServerSession(authOptions)) as Session

  if (!session) {
    return NextResponse.next({
      status: 401,
    })
  }

  const userId = session.user.id

  try {
    const { image }: User = JSON.parse(await request.text())

    const updateImage = await prisma.user.update({
      where: { id: userId },

      data: {
        image: image,
      },
    })

    return NextResponse.json(updateImage)
  } catch (error) {
    console.error("Error updateImage:", error)
    return NextResponse.json(
      {
        message: "An error occurred while updating profile image.",
      },
      { status: 500 }
    )
  }
}
