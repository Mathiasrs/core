import { NextRequest, NextResponse } from "next/server"
import prisma from "lib/prisma"

export async function POST(request: NextRequest) {
  const { slug } = await request.json()

  const views = await prisma.view.findUnique({
    where: { slug },
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
