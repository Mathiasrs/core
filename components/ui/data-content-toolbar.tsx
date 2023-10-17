"use client"

import { useState, useEffect } from "react"
import { labels } from "../data"
import DataContentFacetedFilter from "@/components/ui/data-content-faceted-filter"
import { CommandMenu } from "./command-menu"

interface DataTableToolbarProps {
  labelsFilter: string[]
  setLabelsFilter: (value: string[]) => void
}

export function DataContentToolbar({
  labelsFilter,
  setLabelsFilter,
}: DataTableToolbarProps) {
  const [state, setState] = useState({
    labelKey: labelsFilter,
  })

  useEffect(() => {
    setState({ labelKey: labelsFilter })
  }, [labelsFilter])

  const setFacetState = (key: string, value: any) => {
    setState((prevState) => ({ ...prevState, [key]: value }))
    setLabelsFilter(value)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
      <div className="w-40 md:w-64"> 
         <CommandMenu />    
      </div>
        <DataContentFacetedFilter
            title="Label"
            options={labels}
            stateKey="labelKey"
            state={state}
            setState={setFacetState}
          />
      </div>
    </div>
  )
}
