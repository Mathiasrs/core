import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "app/api/auth/[...nextauth]/route"

interface UserSettings {
  theme: string
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
    const { theme }: UserSettings = JSON.parse(await request.text())

    const updateTheme = await prisma.userSettings.upsert({
      where: { userId: userId },

      create: {
        theme,
        user: {
          connect: {
            id: userId,
          },
        },
      },

      update: {
        theme,
      },
    })

    return NextResponse.json(updateTheme)
  } catch (error) {
    console.error("Error updateTheme:", error)
    return NextResponse.json(
      { message: "An error occurred while creating or updating theme" },
      { status: 500 },
    )
  }
}
