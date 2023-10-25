import { NextRequest, NextResponse } from "next/server"
import prisma from "lib/prisma"

export async function POST(request: NextRequest) {
  const { contentId } = await request.json()

  const views = await prisma.view.findUnique({
    where: { contentId },
  })

  if (!views) {
    return NextResponse.json({
      total: "",
    })
  }

  return NextResponse.json({
    total: views.count.toString(),
  })
}
