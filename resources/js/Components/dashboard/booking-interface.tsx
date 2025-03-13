"use client"

import * as React from "react"
import { differenceInHours } from "date-fns"

import SessionForm from "@/Components/dashboard/session-form"
import ConsoleSelectionCard from "@/Components/dashboard/console-selection"

export default function BookingInterface() {
    const today = new Date()

    // New state for separate date and time selection
    const [startDate, setStartDate] = React.useState<Date | undefined>(today)
    const [startHour, setStartHour] = React.useState<number | undefined>(today.getHours())
    const [endDate, setEndDate] = React.useState<Date | undefined>(today)
    const [endHour, setEndHour] = React.useState<number | undefined>(Math.min(today.getHours() + 1, 24))

    const [selectedConsole, setSelectedConsole] = React.useState<string | undefined>(undefined)
    const [error, setError] = React.useState<string | null>(null)

    // Calculate session duration in hours
    const calculateDuration = React.useCallback(() => {
        if (!startDate || startHour === undefined || !endDate || endHour === undefined) {
            return 0
        }

        // Create full date-time objects
        const start = new Date(startDate)
        start.setHours(startHour, 0, 0, 0)

        const end = new Date(endDate)
        // Handle midnight (24:00) as 00:00 of the next day
        if (endHour === 24) {
            end.setDate(end.getDate() + 1)
            end.setHours(0, 0, 0, 0)
        } else {
            end.setHours(endHour, 0, 0, 0)
        }

        // Calculate difference in hours
        const diffHours = differenceInHours(end, start)
        return diffHours
    }, [startDate, startHour, endDate, endHour])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!startDate || startHour === undefined) {
            setError("Please select a start date and time")
            return
        }

        if (!endDate || endHour === undefined) {
            setError("Please select an end date and time")
            return
        }

        if (!selectedConsole) {
            setError("Please select a console and model")
            return
        }

        if (calculateDuration() <= 0) {
            setError("End time must be after start time")
            return
        }

        setError(null)

        // Here you would typically submit the form data
        console.log({
            startDate,
            startHour,
            endDate,
            endHour,
            duration: calculateDuration(),
            selectedConsole,
        })

        alert("Session scheduled successfully!")
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            <SessionForm
                startDate={startDate}
                setStartDate={setStartDate}
                startHour={startHour}
                setStartHour={setStartHour}
                endDate={endDate}
                setEndDate={setEndDate}
                endHour={endHour}
                setEndHour={setEndHour}
                error={error}
            />

            <ConsoleSelectionCard
                startDate={startDate}
                startHour={startHour}
                endDate={endDate}
                endHour={endHour}
                calculateDuration={calculateDuration}
                selectedConsole={selectedConsole}
                setSelectedConsole={setSelectedConsole}
                onSubmit={handleSubmit}
            />
        </form>
    )
}