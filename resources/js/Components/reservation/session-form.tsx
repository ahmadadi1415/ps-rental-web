"use client"

import * as React from "react"
import { format, addDays, isBefore, isAfter, isSameDay } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Calendar } from "@/Components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Alert, AlertDescription } from "@/Components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Label } from "@/Components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"

// Define session time blocks
const SESSION_BLOCKS = [
    { id: "morning", label: "09:00-12:00", startTime: "09:00", endTime: "12:00" },
    { id: "afternoon", label: "12:00-15:00", startTime: "12:00", endTime: "15:00" },
    { id: "evening", label: "15:00-18:00", startTime: "15:00", endTime: "18:00" },
    { id: "night", label: "18:00-21:00", startTime: "18:00", endTime: "21:00" },
]

interface SessionFormProps {
    sessionDate: Date | undefined
    setSessionDate: (data: Date | undefined) => void
    sessionBlock: string | undefined
    setSessionBlock: (block: string) => void
    error: string | null
}

export default function SessionForm({
    sessionDate,
    setSessionDate,
    sessionBlock,
    setSessionBlock,
    error,
}: SessionFormProps) {
    const today = new Date()
    const maxDate = addDays(today, 7)
    const currentHour = today.getHours()

    // Filter available session blocks based on current time if today is selected
    const availableSessionBlocks = React.useMemo(() => {
        if (sessionDate && isSameDay(sessionDate, today)) {
            return SESSION_BLOCKS.filter((block) => {
                const [hours] = block.startTime.split(":").map(Number)
                return hours > currentHour
            })
        }
        return SESSION_BLOCKS
    }, [sessionDate, today, currentHour])

    // Reset session block if it's no longer available
    React.useEffect(() => {
        if (sessionDate && isSameDay(sessionDate, today) && sessionBlock) {
            const selectedBlock = SESSION_BLOCKS.find((block) => block.id === sessionBlock)
            if (selectedBlock) {
                const [hours] = selectedBlock.startTime.split(":").map(Number)
                if (hours <= currentHour) {
                    setSessionBlock(availableSessionBlocks[0]?.id || "")
                }
            }
        }
    }, [sessionDate, sessionBlock, setSessionBlock, availableSessionBlocks, today, currentHour])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Select Your Session</CardTitle>
                <CardDescription>
                    Choose a date within the next 7 days and a time block for your gaming session.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="session-date">Session Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="session-date"
                                variant={"outline"}
                                className={cn("w-full justify-start text-left font-normal", !sessionDate && "text-muted-foreground")}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {sessionDate ? format(sessionDate, "EEEE, MMMM d, yyyy") : <span>Select date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <div className="p-3 border-b">
                                <h3 className="font-medium text-sm">Select a date within 7 days</h3>
                                <p className="text-xs text-muted-foreground">
                                    Available from {format(today, "MMM d")} to {format(maxDate, "MMM d")}
                                </p>
                            </div>
                            <Calendar
                                initialFocus
                                mode="single"
                                selected={sessionDate}
                                onSelect={setSessionDate}
                                disabled={(date) => {
                                    return (isBefore(date, today) && !isSameDay(date, today)) || isAfter(date, maxDate)
                                }}
                                footer={
                                    <div className="px-4 pt-0 pb-3">
                                        <p className="text-sm text-muted-foreground">
                                            {sessionDate ? (
                                                <>
                                                    Selected: <span className="font-medium">{format(sessionDate, "MMMM d, yyyy")}</span>
                                                </>
                                            ) : (
                                                "Please select a date"
                                            )}
                                        </p>
                                    </div>
                                }
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="session-time">Session Time</Label>
                    <Select
                        value={sessionBlock}
                        onValueChange={setSessionBlock}
                        disabled={!sessionDate || availableSessionBlocks.length === 0}
                    >
                        <SelectTrigger id="session-time" className="w-full">
                            <SelectValue placeholder="Select a time block">
                                {sessionBlock ? (
                                    <div className="flex items-center">
                                        <Clock className="mr-2 h-4 w-4" />
                                        {SESSION_BLOCKS.find((block) => block.id === sessionBlock)?.label}
                                    </div>
                                ) : (
                                    "Select a time block"
                                )}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {availableSessionBlocks.length > 0 ? (
                                availableSessionBlocks.map((block) => (
                                    <SelectItem key={block.id} value={block.id}>
                                        {block.label}
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectItem value="none" disabled>
                                    No available sessions today
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>

                    {sessionDate && isSameDay(sessionDate, today) && availableSessionBlocks.length === 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                            No more sessions available today. Please select another date.
                        </p>
                    )}
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