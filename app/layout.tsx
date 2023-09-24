import "./globals.css"

import { Providers } from "./providers"

// Next
import type { Metadata } from "next"

// Auth
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"

export const metadata: Metadata = {
  title: "Core",
  description: "Core - Knowledge and Learning",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = (await getServerSession(authOptions)) as any

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <Providers session={session}>{children}</Providers>
        </body>
      </html>
    </>
  )
}
