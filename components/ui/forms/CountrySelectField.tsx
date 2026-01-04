'use client'

import React, { useMemo, useState } from 'react'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Controller } from "react-hook-form"
import countryList from 'react-select-country-list'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

const CountrySelectField = ({ name, label, control, error, required = false }: CountrySelectProps) => {
  const countries = useMemo(() => countryList().getData(), [])
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-2">
        <Label htmlFor={name}>{label}</Label>

        <Controller 
            name={name}
            control={control}
            rules={{
                required: required ? 'Please select a country' : false,
            }}
            render={({ field }) => (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="country-select-trigger"
                        >
                            {field.value || "Select your country"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 bg-gray-800 border-gray-600">
                        <Command className="bg-gray-800">
                            <CommandInput 
                                placeholder="Search country..." 
                                className="country-select-input"
                            />
                            <CommandList>
                                <CommandEmpty className="country-select-empty">
                                    No country found.
                                </CommandEmpty>
                                <CommandGroup>
                                    {countries.map((country) => (
                                        <CommandItem
                                            key={country.value}
                                            value={country.label}
                                            onSelect={() => {
                                                field.onChange(country.label)
                                                setOpen(false)
                                            }}
                                            className="country-select-item"
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    field.value === country.label ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {country.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            )}
        />
        
        {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  )
}

export default CountrySelectField