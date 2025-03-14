"use client"
import { addDays, format, isBefore, isAfter, isSameDay } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Calendar } from "@/Components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"

interface DateRangePickerProps {
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
  className?: string
}

export function DateRangePicker({ dateRange, onDateRangeChange, className }: DateRangePickerProps) {
  const today = new Date()
  const maxDate = addDays(today, 7)

  // Ensure the selected dates are within the allowed range
  const handleSelect = (range: DateRange | undefined) => {
    if (!range) {
      onDateRangeChange(undefined)
      return
    }

    // Ensure from date is not before today
    if (range.from && isBefore(range.from, today) && !isSameDay(range.from, today)) {
      range.from = today
    }

    // Ensure to date is not after maxDate
    if (range.to && isAfter(range.to, maxDate)) {
      range.to = maxDate
    }

    onDateRangeChange(range)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Select date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={today}
            selected={dateRange}
            onSelect={handleSelect}
            numberOfMonths={1}
            disabled={(date) => (isBefore(date, today) && !isSameDay(date, today)) || isAfter(date, maxDate)}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}