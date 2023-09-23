import "./globals.css"

import { ThemeProvider } from "@/components/ThemeProvider"

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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
