"use client"

import * as React from "react"
import { format } from "date-fns"
import { Gamepad2 } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Button } from "@/Components/ui/button"
import { Label } from "@/Components/ui/label"

interface ConsoleSelectionCardProps {
    startDate: Date | undefined
    startHour: number | undefined
    endDate: Date | undefined
    endHour: number | undefined
    calculateDuration: () => number
    selectedConsole: string | undefined
    setSelectedConsole: (console: string) => void
    onSubmit: (e: React.FormEvent) => void
}

const CONSOLE_PRICES = {
    PS4: 30000,
    PS5: 40000
}

export default function ConsoleSelectionCard({
    startDate,
    startHour,
    endDate,
    endHour,
    calculateDuration,
    selectedConsole,
    setSelectedConsole,
    onSubmit,
}: ConsoleSelectionCardProps) {
    // Format hour for display
    const formatHour = (hour: number | undefined) => {
        if (hour === undefined) return ""
        return hour === 24 ? "00:00" : `${hour.toString().padStart(2, "0")}:00`
    }

    // Calculate price based on console, model and duration
    const calculatePrice = () => {
        if (!selectedConsole) return 0

        const basePrice = CONSOLE_PRICES[selectedConsole as keyof typeof CONSOLE_PRICES]

        const duration = calculateDuration()
        return basePrice * duration
    }


    const duration = calculateDuration()
    const isFormComplete =
        startDate &&
        startHour !== undefined &&
        endDate &&
        endHour !== undefined &&
        selectedConsole &&
        duration > 0

    return (
        <Card>
            <CardHeader>
                <CardTitle>Select Console</CardTitle>
                <CardDescription>Choose your preferred gaming console and model</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="console-type">Console</Label>
                        <Select value={selectedConsole} onValueChange={setSelectedConsole}>
                            <SelectTrigger id="console-type">
                                <SelectValue placeholder="Select console" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PS4">PlayStation 4</SelectItem>
                                <SelectItem value="PS5">PlayStation 5</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {selectedConsole && startDate && endDate && (
                    <div className="bg-muted p-4 rounded-lg space-y-3">
                        <h3 className="font-medium text-lg">Session Details</h3>

                        <div className="grid grid-cols-[100px_1fr] gap-1">
                            <span className="text-muted-foreground">Start:</span>
                            <span className="font-medium">
                                {format(startDate, "LLL dd, y")} at {formatHour(startHour)}
                            </span>

                            <span className="text-muted-foreground">End:</span>
                            <span className="font-medium">
                                {format(endDate, "LLL dd, y")} at {formatHour(endHour)}
                            </span>

                            <span className="text-muted-foreground">Duration:</span>
                            <span className="font-medium">{duration} hours</span>

                            <span className="text-muted-foreground">Console:</span>
                            <span className="font-medium">
                                {selectedConsole === "PS4" ? "PlayStation 4" : "PlayStation 5"}
                            </span>

                            <span className="text-muted-foreground">Price:</span>
                            <span className="font-medium text-lg">Rp{calculatePrice()}</span>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full" disabled={!isFormComplete}>
                    <Gamepad2 className="mr-2 h-4 w-4" />
                    Schedule Session
                </Button>
            </CardFooter>
        </Card>
    )
}