"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PlusIcon } from "@radix-ui/react-icons"

export function ComboBox({ text, textEmpty, items, onSelect }: any) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {text}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search permissions..." />
          <CommandEmpty>{textEmpty}</CommandEmpty>
          <CommandGroup>
            {items.map((item: any) => (
              <CommandItem
                key={item.key}
                value={item.key}
                onSelect={() => {
                  setOpen(false)
                  onSelect(item.key)
                }}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                {item.displayName}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
