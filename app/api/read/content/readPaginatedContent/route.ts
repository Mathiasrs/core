import { NextResponse } from "next/server"

// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "app/api/auth/[...nextauth]/route"

// Libraries
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  const session = (await getServerSession(authOptions)) as any
  const { pageParam } = await request.json()
  const pageSize = 2

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const readPaginatedContent = await prisma.content.findMany({
      where: { isPublished: true },
      skip: (pageParam - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(readPaginatedContent)
  } catch (error) {
    console.error("Error reading content:", error)

    return NextResponse.json(
      { message: "An error occurred while reading content" },
      { status: 500 },
    )
  }
}
