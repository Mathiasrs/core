"use client"

import * as React from "react"

// Mutations
import { useUpdateTheme } from "@/app/actions/mutations/user/useUpdateTheme"

// Libraries
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

// Components
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeSelector() {
  const { setTheme } = useTheme()

  const mutation = useUpdateTheme()

  const setThemeAndUpdateUser = (data: any) => {
    setTheme(data)

    mutation.mutate({
      theme: data,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setThemeAndUpdateUser("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeAndUpdateUser("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeAndUpdateUser("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
