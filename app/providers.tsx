"use client"

// Libraries
import { SessionProvider } from "next-auth/react"

// Components
import { ThemeProvider } from "@/components/ThemeProvider"

type Props = {
  children?: React.ReactNode
}

export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}
