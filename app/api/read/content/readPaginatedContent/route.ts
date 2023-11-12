import { NextResponse } from "next/server"

// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "app/api/auth/[...nextauth]/route"

// APIs
import { GET as readTenantId } from "@/app/api/read/tenant/readTenantId/route"

// Libraries
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  const session = (await getServerSession(authOptions)) as any
  const { pageParam, pageSize } = await request.json()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const tenantResponse = await readTenantId()
    const tenantData = await tenantResponse.json()
    const tenantId = tenantData.tenantId

    const readPaginatedContent = await prisma.content.findMany({
      where: { isPublished: true, tenantId: tenantId },
      skip: (pageParam - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        localizations: true,
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
