import { NextRequest, NextResponse } from "next/server"
import prisma from "lib/prisma"

export async function POST(request: NextRequest) {
  const { contentType, slug } = await request.json()

  const newOrUpdatedViews = await prisma.view.upsert({
    where: { slug },
    create: {
      slug,
      contentType,
    },
    update: {
      count: {
        increment: 1,
      },
    },
  })

  return NextResponse.json({
    total: newOrUpdatedViews.count.toString(),
  })
}
