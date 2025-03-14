"use client"

import type * as React from "react"
import { format } from "date-fns"
import { Gamepad2, Calendar, Clock } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Button } from "@/Components/ui/button"
import { Label } from "@/Components/ui/label"
import { Badge } from "@/Components/ui/badge"

interface SessionBlock {
    id: string
    label: string
    startTime: string
    endTime: string
}

interface ConsoleSelectionCardProps {
    sessionDate: Date | undefined
    sessionBlock: SessionBlock | null
    selectedConsole: string | undefined
    setSelectedConsole: (console: string) => void
    onSubmit: (e: React.FormEvent) => void
}

const CONSOLE_PRICES = {
    PS4: 30000,
    PS5: 40000,
}

export default function ConsoleSelectionCard({
    sessionDate,
    sessionBlock,
    selectedConsole,
    setSelectedConsole,
    onSubmit,
}: ConsoleSelectionCardProps) {
    // Calculate price based on console only
    const calculatePrice = () => {
        if (!selectedConsole) return 0
        return CONSOLE_PRICES[selectedConsole as keyof typeof CONSOLE_PRICES]
    }

    const isFormComplete = sessionDate && sessionBlock && selectedConsole

    return (
        <Card>
            <CardHeader>
                <CardTitle>Select Console</CardTitle>
                <CardDescription>Choose your preferred gaming console</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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

                {selectedConsole && sessionDate && sessionBlock && (
                    <div className="bg-muted p-4 rounded-lg space-y-4">
                        <h3 className="font-medium text-lg">Session Details</h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">{format(sessionDate, "EEEE, MMMM d, yyyy")}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="outline" className="font-normal">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {sessionBlock.startTime}
                                        </Badge>
                                        <span className="text-muted-foreground">to</span>
                                        <Badge variant="outline" className="font-normal">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {sessionBlock.endTime}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-2 border-t border-border">
                                <Gamepad2 className="h-5 w-5 text-muted-foreground" />
                                <p className="font-medium">{selectedConsole === "PS4" ? "PlayStation 4" : "PlayStation 5"}</p>
                            </div>

                            <div className="pt-2 border-t border-border">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Price:</span>
                                    <span className="font-medium text-lg">Rp{calculatePrice().toFixed(2)}</span>
                                </div>
                            </div>
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