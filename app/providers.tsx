"use client"

// Libraries
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Components
import { ThemeProvider } from "@/components/ThemeProvider"
import AppShell from "@/components/AppShell"

const queryClient = new QueryClient()

type Props = {
  children?: React.ReactNode
  session: any
}

export const Providers = ({ children, session }: Props) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <QueryClientProvider client={queryClient}>
          <AppShell session={session}>{children}</AppShell>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
