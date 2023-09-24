import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "app/api/auth/[...nextauth]/route"

interface Profile {
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
    const { id, name, about, url }: Profile = JSON.parse(await request.text())

    const createOrUpdateProfile = await prisma.profile.upsert({
      where: { id: id || "" },
      update: {
        name: name,
        about: about,
        url: url,
      },
      create: {
        name: name,
        about: about,
        url: url,
        user: { connect: { id: userId } },
      },
    })

    return NextResponse.json(createOrUpdateProfile)
  } catch (error) {
    console.error("Error createOrUpdateProfile:", error)
    return NextResponse.json(
      { message: "An error occurred while creating or updating profile" },
      { status: 500 },
    )
  }
}
