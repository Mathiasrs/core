import "./globals.css"

import { Providers } from "./providers"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Core",
  description: "Core - Knowledge and Learning",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </>
  )
}
