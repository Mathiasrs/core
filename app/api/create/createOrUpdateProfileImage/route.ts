import { NextRequest, NextResponse } from "next/server"

// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "app/api/auth/[...nextauth]/route"

// Libraries
import prisma from "@/lib/prisma"
import { Session } from "@/typings"

interface Profile {
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
    const { id, image }: Profile = JSON.parse(await request.text())

    const updateProfileImage = await prisma.profile.upsert({
      where: { id: id || "" },

      update: {
        image: image,
      },

      create: {
        image: image,
        user: { connect: { id: userId } },
      },
    })

    return NextResponse.json(updateProfileImage)
  } catch (error) {
    console.error("Error updateProfileImage:", error)
    return NextResponse.json(
      {
        message: "An error occurred while updating profile image.",
      },
      { status: 500 },
    )
  }
}
