import { NextResponse } from "next/server"

// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "app/api/auth/[...nextauth]/route"

// Libraries
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  const session = (await getServerSession(authOptions)) as any
  const { id } = await request.json()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const readUserById = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        permission: true,
      },
    })

    return NextResponse.json(readUserById)
  } catch (error) {
    console.error("Error reading user:", error)

    return NextResponse.json(
      { message: "An error occurred while reading user" },
      { status: 500 },
    )
  }
}
