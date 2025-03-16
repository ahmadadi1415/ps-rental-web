"use client"

import * as React from "react"
import { format } from "date-fns"
import { CheckCircle2, Clock, AlertCircle, XCircle, CreditCard, Ban, ArrowRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"
import { Badge } from "@/Components/ui/badge"
import { Separator } from "@/Components/ui/separator"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

// Define reservation status types
export type ReservationStatus = "pending" | "confirmed" | "cancelled" | "completed"

export interface ReservationDetailsProps {
    id: string
    status: ReservationStatus
    startDate: Date
    startHour: number
    endDate: Date
    endHour: number
    duration: number
    console: string
    price: number
    onPay: () => void
    onCancel: () => void
}

export default function ReservationDetails({
    id,
    status,
    startDate,
    startHour,
    endDate,
    endHour,
    duration,
    console: consoleType,
    price,
    onPay,
    onCancel,
}: ReservationDetailsProps) {
    const [cancelDialogOpen, setCancelDialogOpen] = React.useState(false)

    // Format hour for display
    const formatHour = (hour: number) => {
        return hour === 24 ? "00:00" : `${hour.toString().padStart(2, "0")}:00`
    }

    // Get status badge configuration
    const getStatusConfig = (status: ReservationStatus) => {
        switch (status) {
            case "pending":
                return {
                    label: "Pending Payment",
                    variant: "outline" as const,
                    icon: <Clock className="h-4 w-4 mr-1" />,
                }
            case "confirmed":
                return {
                    label: "Confirmed",
                    variant: "default" as const,
                    icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
                }
            case "cancelled":
                return {
                    label: "Cancelled",
                    variant: "destructive" as const,
                    icon: <XCircle className="h-4 w-4 mr-1" />,
                }
            case "completed":
                return {
                    label: "Completed",
                    variant: "secondary" as const,
                    icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
                }
        }
    }

    const statusConfig = getStatusConfig(status)

    return (
        <Card className="w-full">
            <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl">Reservation #{id}</CardTitle>
                        <CardDescription>Created on {format(new Date(), "PPP")}</CardDescription>
                    </div>
                    <Badge variant={statusConfig.variant} className="flex items-center px-3 py-1">
                        {statusConfig.icon}
                        {statusConfig.label}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <h3 className="text-sm font-medium text-muted-foreground">Start Time</h3>
                        <p className="text-base font-medium">
                            {format(startDate, "PPP")} at {formatHour(startHour)}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-sm font-medium text-muted-foreground">End Time</h3>
                        <p className="text-base font-medium">
                            {format(endDate, "PPP")} at {formatHour(endHour)}
                        </p>
                    </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <h3 className="text-sm font-medium text-muted-foreground">Console</h3>
                        <p className="text-base font-medium">
                            {consoleType}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-sm font-medium text-muted-foreground">Duration</h3>
                        <p className="text-base font-medium">{duration} hours</p>
                    </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Total Price</h3>
                            <p className="text-xl font-bold">Rp{price.toFixed(2)}</p>
                        </div>
                        {status === "pending" && (
                            <div className="flex items-center text-sm text-amber-600">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                Payment required to confirm
                            </div>
                        )}
                    </div>
                </div>

                {status === "confirmed" && (
                    <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
                        <div className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium text-green-800">Your reservation is confirmed</h3>
                                <p className="text-sm text-green-700 mt-1">
                                    Please arrive 15 minutes before your session starts. Bring your ID for verification.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {status === "cancelled" && (
                    <div className="bg-red-50 border border-red-100 p-4 rounded-lg">
                        <div className="flex items-start">
                            <XCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium text-red-800">This reservation has been cancelled</h3>
                                <p className="text-sm text-red-700 mt-1">
                                    If you believe this is an error, please contact customer support.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex gap-3 pt-2">
                {status === "pending" && (
                    <>
                        <Button className="flex-1" onClick={onPay}>
                            <CreditCard className="h-4 w-4 mr-2" />
                            Pay Now
                        </Button>
                        <Button variant="outline" className="flex-1" onClick={() => setCancelDialogOpen(true)}>
                            <Ban className="h-4 w-4 mr-2" />
                            Cancel
                        </Button>
                    </>
                )}

                {status === "confirmed" && (
                    <Button variant="outline" className="flex-1" onClick={() => setCancelDialogOpen(true)}>
                        <Ban className="h-4 w-4 mr-2" />
                        Cancel Reservation
                    </Button>
                )}

                {(status === "cancelled" || status === "completed") && (
                    <Button variant="outline" className="flex-1">
                        Book Again
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                )}
            </CardFooter>

            {/* Cancel Confirmation Dialog */}
            <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cancel Reservation</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to cancel this reservation? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-sm text-muted-foreground">
                            {status === "confirmed"
                                ? "Cancellations made less than 24 hours before the session start time may be subject to a cancellation fee."
                                : "Your payment method will not be charged if you cancel now."}
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
                            Keep Reservation
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                onCancel()
                                setCancelDialogOpen(false)
                            }}
                        >
                            Yes, Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    )
}