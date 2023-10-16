import * as React from "react"
import { useEffect, useState } from "react"
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

interface DataContentFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
  stateKey: string
  state: Record<string, any>
  setState: (key: string, value: any) => void
}

export default function DataContentFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  stateKey,
  state,
  setState,
}: DataContentFacetedFilterProps<TData, TValue>) {
  const [localState, setLocalState] = useState(new Set())

  useEffect(() => {
    if (state[stateKey]) {
      setLocalState(new Set(state[stateKey]))
    }
  }, [state, stateKey])

  const facets = column?.getFacetedUniqueValues()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {localState.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {localState.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {localState.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {localState.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => localState.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = localState.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      isSelected
                        ? localState.delete(option.value)
                        : localState.add(option.value)
                      setLocalState(new Set(localState))
                      const newState = Array.from(localState)
                      setState(stateKey, newState)
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50",
                      )}
                    >
                      {isSelected ? <CheckIcon className="h-4 w-4" /> : null}
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {localState.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setState(stateKey, [])
                    }}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
