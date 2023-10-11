import { NextResponse } from "next/server"

// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "app/api/auth/[...nextauth]/route"

// Libraries
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  const session = (await getServerSession(authOptions)) as any
  const { slug } = await request.json()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const readContentBySlug = await prisma.content.findUnique({
      where: {
        slug: slug,
      },
    })

    return NextResponse.json(readContentBySlug)
  } catch (error) {
    console.error("Error reading content:", error)

    return NextResponse.json(
      { message: "An error occurred while reading content" },
      { status: 500 }
    )
  }
}
