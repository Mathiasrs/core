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
    const readContent = await prisma.content.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(readContent)
  } catch (error) {
    console.error("Error reading content:", error)

    return NextResponse.json(
      { message: "An error occurred while reading content" },
      { status: 500 },
    )
  }
}