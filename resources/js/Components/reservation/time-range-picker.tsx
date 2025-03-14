"use client"

import * as React from "react"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Label } from "@/Components/ui/label"

interface TimeRange {
  startTime: string
  endTime: string
}

interface TimeRangePickerProps {
  timeRange: TimeRange
  onTimeRangeChange: (range: TimeRange) => void
  className?: string
}

export function TimeRangePicker({ timeRange, onTimeRangeChange, className }: TimeRangePickerProps) {
  // Generate time options in 30-minute intervals
  const timeOptions = React.useMemo(() => {
    const options = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0")
        const formattedMinute = minute.toString().padStart(2, "0")
        options.push(`${formattedHour}:${formattedMinute}`)
      }
    }
    return options
  }, [])

  const handleStartTimeChange = (value: string) => {
    onTimeRangeChange({
      ...timeRange,
      startTime: value,
    })
  }

  const handleEndTimeChange = (value: string) => {
    onTimeRangeChange({
      ...timeRange,
      endTime: value,
    })
  }

  // Replace the formatDisplayTime function with this simpler version that keeps 24-hour format
  const formatDisplayTime = (time: string) => {
    if (!time) return ""
    return time
  }

  // Update the displayText to use the new format
  const displayText =
    timeRange.startTime && timeRange.endTime
      ? `${formatDisplayTime(timeRange.startTime)} - ${formatDisplayTime(timeRange.endTime)}`
      : "Select time range"

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="time"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !timeRange.startTime && "text-muted-foreground",
            )}
          >
            <Clock className="mr-2 h-4 w-4" />
            {displayText}
          </Button>
        </PopoverTrigger>
        {/* Change the PopoverContent to make start and end time side by side */}
        <PopoverContent className="w-96" align="start">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Select value={timeRange.startTime} onValueChange={handleStartTimeChange}>
                <SelectTrigger id="start-time">
                  <SelectValue placeholder="Start time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={`start-${time}`} value={time}>
                      {formatDisplayTime(time)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time</Label>
              <Select value={timeRange.endTime} onValueChange={handleEndTimeChange}>
                <SelectTrigger id="end-time">
                  <SelectValue placeholder="End time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={`end-${time}`} value={time}>
                      {formatDisplayTime(time)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}