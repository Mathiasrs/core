import { NextRequest, NextResponse } from "next/server"

// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "app/api/auth/[...nextauth]/route"

// Libraries
import prisma from "@/lib/prisma"
import { Session } from "@/types/typings"

interface Permission {
  id: string
  permissionKey: string
  value: boolean
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = (await getServerSession(authOptions)) as Session

  if (!session) {
    return NextResponse.next({
      status: 401,
    })
  }

  try {
    const { id, permissionKey, value }: Permission = JSON.parse(
      await request.text(),
    )

    const updateData = { [permissionKey]: value }

    const updatePermission = await prisma.permission.update({
      where: { id: id },
      data: updateData,
    })

    return NextResponse.json(updatePermission)
  } catch (error) {
    console.error("Error updatePermission:", error)
    return NextResponse.json(
      {
        message: "An error occurred while updating user permission.",
      },
      { status: 500 },
    )
  }
}
