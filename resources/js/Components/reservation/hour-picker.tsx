"use client"

import * as React from "react"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/ui/command"

interface HourPickerProps {
    hour: number | undefined
    onHourChange: (hour: number) => void
    minHour?: number
    maxHour?: number
    label?: string
    className?: string
}

export function HourPicker({
    hour,
    onHourChange,
    minHour = 0,
    maxHour = 24,
    label = "Select hour",
    className,
}: HourPickerProps) {
    const [open, setOpen] = React.useState(false)

    // Generate available hours
    const hours = React.useMemo(() => {
        const result = []
        for (let i = minHour; i <= maxHour; i++) {
            result.push(i)
        }
        return result
    }, [minHour, maxHour])

    // Format hour for display (24-hour format with leading zero)
    const formatHour = (h: number) => {
        return h === 24 ? "00:00" : `${h.toString().padStart(2, "0")}:00`
    }

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn("w-full justify-start text-left font-normal", !hour && "text-muted-foreground")}
                    >
                        <Clock className="mr-2 h-4 w-4" />
                        {hour !== undefined ? formatHour(hour) : label}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search hour..." />
                        <CommandEmpty>No hour found.</CommandEmpty>
                        <CommandList>
                            <CommandGroup>
                                {hours.map((h) => (
                                    <CommandItem
                                        key={h}
                                        value={h.toString()}
                                        onSelect={() => {
                                            onHourChange(h)
                                            setOpen(false)
                                        }}
                                    >
                                        {formatHour(h)}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}