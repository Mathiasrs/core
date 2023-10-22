import { NextRequest, NextResponse } from "next/server"

// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "app/api/auth/[...nextauth]/route"

// Libraries
import prisma from "@/lib/prisma"
import { Session } from "@/types/typings"

interface User {
  id: string
  status: string
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = (await getServerSession(authOptions)) as Session

  if (!session) {
    return NextResponse.next({
      status: 401,
    })
  }

  try {
    const { id, status }: User = JSON.parse(await request.text())

    const updateStatus = await prisma.user.update({
      where: { id: id },

      data: {
        status: status,
      },
    })

    return NextResponse.json(updateStatus)
  } catch (error) {
    console.error("Error updateStatus:", error)
    return NextResponse.json(
      {
        message: "An error occurred while updating profile status.",
      },
      { status: 500 },
    )
  }
}
