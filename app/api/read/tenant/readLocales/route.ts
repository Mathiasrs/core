import { NextResponse } from "next/server"

// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "app/api/auth/[...nextauth]/route"

// APIs
import { GET as readTenantId } from "@/app/api/read/tenant/readTenantId/route"

// Libraries
import prisma from "@/lib/prisma"

export async function GET(): Promise<NextResponse> {
  const session = (await getServerSession(authOptions)) as any

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const tenantResponse = await readTenantId()
    const tenantData = await tenantResponse.json()
    const tenantId = tenantData.tenantId

    const readLocales = await prisma.locale.findMany({
      where: {
        tenantId: tenantId,
      },
    })

    return NextResponse.json(readLocales)
  } catch (error) {
    console.error("Error reading profile:", error)

    return NextResponse.json(
      { message: "An error occurred while reading the profile" },
      { status: 500 },
    )
  }
}
