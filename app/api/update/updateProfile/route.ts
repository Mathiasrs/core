import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "app/api/auth/[...nextauth]/route"

interface User {
  id: string
  name: string
  about: string
  url: string
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.next({
      status: 401,
    })
  }
  // @ts-ignore
  const userId = session.user.id

  try {
    const { name, about, url }: User = JSON.parse(await request.text())

    const updateUser = await prisma.user.update({
      where: { id: userId },

      data: {
        name: name,
        about: about,
        url: url,
      },
    })

    return NextResponse.json(updateUser)
  } catch (error) {
    console.error("Error updateUser:", error)
    return NextResponse.json(
      { message: "An error occurred while creating or updating profile" },
      { status: 500 }
    )
  }
}
