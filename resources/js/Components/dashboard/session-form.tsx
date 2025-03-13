"use client"

import * as React from "react"
import { addDays, isSameDay } from "date-fns"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Alert, AlertDescription } from "@/Components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Label } from "@/Components/ui/label"
import { DatePicker } from "@/Components/dashboard/date-picker"
import { HourPicker } from "@/Components/dashboard/hour-picker"

interface SessionFormProps {
  startDate: Date | undefined
  setStartDate: (date: Date | undefined) => void
  startHour: number | undefined
  setStartHour: (hour: number) => void
  endDate: Date | undefined
  setEndDate: (date: Date | undefined) => void
  endHour: number | undefined
  setEndHour: (hour: number) => void
  error: string | null
}

export default function SessionForm({
  startDate,
  setStartDate,
  startHour,
  setStartHour,
  endDate,
  setEndDate,
  endHour,
  setEndHour,
  error,
}: SessionFormProps) {
  const today = new Date()
  const maxDate = addDays(today, 7)
  const currentHour = today.getHours()

  // Calculate min hour for start time (if today, then current hour)
  const minStartHour = React.useMemo(() => {
    if (startDate && isSameDay(startDate, today)) {
      return currentHour
    }
    return 0
  }, [startDate, today, currentHour])

  // When start date changes, adjust start hour if needed
  React.useEffect(() => {
    if (startDate && isSameDay(startDate, today) && startHour !== undefined && startHour < currentHour) {
      setStartHour(currentHour)
    }
  }, [startDate, startHour, setStartHour, today, currentHour])

  // When start date or hour changes, adjust end date and hour if needed
  React.useEffect(() => {
    if (!startDate || startHour === undefined) return

    // If end date is before start date, set it to start date
    if (!endDate || isSameDay(endDate, startDate) || endDate < startDate) {
      setEndDate(startDate)

      // If on same day and end hour <= start hour, set end hour to start hour + 1
      if (endHour === undefined || endHour <= startHour) {
        setEndHour(Math.min(startHour + 1, 24))
      }
    }
  }, [startDate, startHour, endDate, endHour, setEndDate, setEndHour])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule a Session</CardTitle>
        <CardDescription>Select start and end date/time for your gaming session.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Session Start</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <DatePicker
                date={startDate}
                onDateChange={setStartDate}
                minDate={today}
                maxDate={maxDate}
                label="Select start date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <HourPicker
                hour={startHour}
                onHourChange={setStartHour}
                minHour={minStartHour}
                maxHour={23}
                label="Select hour"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Session End</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <DatePicker
                date={endDate}
                onDateChange={setEndDate}
                minDate={startDate || today}
                maxDate={maxDate}
                label="Select end date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time</Label>
              <HourPicker
                hour={endHour}
                onHourChange={setEndHour}
                minHour={startDate && endDate && isSameDay(startDate, endDate) ? (startHour || 0) + 1 : 0}
                maxHour={24}
                label="Select hour"
              />
            </div>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}