import { NextResponse } from "next/server"

// Libraries
import prisma from "@/lib/prisma"

export async function POST(request: Request) {

  try {
    const readViews = await prisma.view.findMany()

    return NextResponse.json(readViews)
  } catch (error) {
    console.error("Error reading views:", error)

    return NextResponse.json(
      { message: "An error occurred while reading views" },
      { status: 500 },
    )
  }
}
