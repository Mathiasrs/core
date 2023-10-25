import { NextRequest, NextResponse } from "next/server"
import prisma from "lib/prisma"

export async function POST(request: NextRequest) {
  const { contentId, type } = await request.json()

  const createOrUpdateView = await prisma.view.upsert({
    where: { contentId },
    create: {
      contentId,
      type,
    },
    update: {
      count: {
        increment: 1,
      },
    },
  })

  return NextResponse.json({
    total: createOrUpdateView.count.toString(),
  })
}
