import { NextResponse } from "next/server"

// Libraries
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  const { type } = await request.json()

  try {
    const readViews = await prisma.view.findMany({
      where: { type: type },
    })

    return NextResponse.json(readViews)
  } catch (error) {
    console.error("Error reading views:", error)

    return NextResponse.json(
      { message: "An error occurred while reading views" },
      { status: 500 },
    )
  }
}
