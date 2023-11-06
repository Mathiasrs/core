import { NextResponse } from "next/server"

// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "app/api/auth/[...nextauth]/route"

// Libraries
import prisma from "@/lib/prisma"

export async function GET(): Promise<NextResponse> {
  const session = (await getServerSession(authOptions)) as any

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const readUser = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
      include: {
        permission: true,
      },
    })

    return NextResponse.json(readUser)
  } catch (error) {
    console.error("Error reading profile:", error)

    return NextResponse.json(
      { message: "An error occurred while reading the profile" },
      { status: 500 }
    )
  }
}
