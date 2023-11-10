import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "app/api/auth/[...nextauth]/route"

interface UserSettings {
  locale: string
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
    const { locale }: UserSettings = JSON.parse(await request.text())

    const updateLocale = await prisma.userSettings.upsert({
      where: { userId: userId },

      create: {
        locale,
        user: {
          connect: {
            id: userId,
          },
        },
      },

      update: {
        locale,
      },
    })

    return NextResponse.json(updateLocale)
  } catch (error) {
    console.error("Error updateLocale:", error)
    return NextResponse.json(
      { message: "An error occurred while creating or updating locale" },
      { status: 500 },
    )
  }
}
