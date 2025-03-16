"use client"
import { format, isBefore, isAfter, isSameDay } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Calendar } from "@/Components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"

interface DatePickerProps {
    date: Date | undefined
    onDateChange: (date: Date | undefined) => void
    minDate?: Date
    maxDate?: Date
    label?: string
    className?: string
}

export function DatePicker({
    date,
    onDateChange,
    minDate,
    maxDate,
    label = "Pick a date",
    className,
}: DatePickerProps) {
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "LLL dd, y") : <span>{label}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="single"
                        selected={date}
                        onSelect={onDateChange}
                        disabled={(day) => {
                            const isBeforeMin = minDate ? (isBefore(day, minDate) && !isSameDay(day, minDate)) : false;
                            const isAfterMax = maxDate ? isAfter(day, maxDate) : false;
                            return isBeforeMin || isAfterMax;
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
