"use client"

import * as React from "react"

import SessionForm from "@/Components/reservation/session-form"
import ConsoleSelectionCard from "@/Components/reservation/console-selection"

// Define session time blocks (same as in SessionForm)
const SESSION_BLOCKS = [
    { id: "morning", label: "09:00-12:00", startTime: "09:00", endTime: "12:00" },
    { id: "afternoon", label: "12:00-15:00", startTime: "12:00", endTime: "15:00" },
    { id: "evening", label: "15:00-18:00", startTime: "15:00", endTime: "18:00" },
    { id: "night", label: "18:00-21:00", startTime: "18:00", endTime: "21:00" },
]

export default function BookingInterface() {
    const today = new Date()

    // State for date and time selection
    const [sessionDate, setSessionDate] = React.useState<Date | undefined>(today)
    const [sessionBlock, setSessionBlock] = React.useState<string | undefined>(undefined)

    // Console selection state
    const [selectedConsole, setSelectedConsole] = React.useState<string | undefined>(undefined)
    const [error, setError] = React.useState<string | null>(null)

    // Get the selected session block details
    const getSelectedSessionBlock = React.useCallback(() => {
        if (!sessionBlock) return null
        return SESSION_BLOCKS.find((block) => block.id === sessionBlock) || null
    }, [sessionBlock])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!sessionDate) {
            setError("Please select a session date")
            return
        }

        if (!sessionBlock) {
            setError("Please select a session time")
            return
        }

        if (!selectedConsole) {
            setError("Please select a console")
            return
        }

        setError(null)

        const selectedBlock = getSelectedSessionBlock()

        // Here you would typically submit the form data
        console.log({
            sessionDate,
            sessionTime: selectedBlock?.label,
            startTime: selectedBlock?.startTime,
            endTime: selectedBlock?.endTime,
            selectedConsole,
        })

        alert("Session scheduled successfully!")
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            <SessionForm
                sessionDate={sessionDate}
                setSessionDate={setSessionDate}
                sessionBlock={sessionBlock}
                setSessionBlock={setSessionBlock}
                error={error}
            />

            <ConsoleSelectionCard
                sessionDate={sessionDate}
                sessionBlock={getSelectedSessionBlock()}
                selectedConsole={selectedConsole}
                setSelectedConsole={setSelectedConsole}
                onSubmit={handleSubmit}
            />
        </form>
    )
}