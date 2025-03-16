"use client"

import * as React from "react"
import { addDays } from "date-fns"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import ReservationDetails, { type ReservationStatus } from "@/Components/reservation/details/reservation-details"
import { toast } from "sonner"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"

interface ReservationProps {
    reservation: any
}

export default function Show(props: ReservationProps) {
    console.log(props.reservation);

    const [status, setStatus] = React.useState<ReservationStatus>("pending")

    const handlePay = () => {
        setStatus("confirmed")
        toast.success("Payment successful", {
            description: "Your reservation has been confirmed.",
        })
    }

    const handleCancel = () => {
        setStatus("cancelled")
        toast.error("Reservation cancelled", {
            description: "Your reservation has been cancelled successfully.",
        })
    }

    const today = new Date()

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Reservation
                </h2>
            }
        >
            <Head title="Reservation" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="max-w-3xl mx-auto">
                                <Tabs defaultValue="pending" className="mb-6">
                                    <TabsList className="grid grid-cols-4">
                                        <TabsTrigger value="pending">Pending</TabsTrigger>
                                        <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                                        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                                        <TabsTrigger value="completed">Completed</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="pending">
                                        <ReservationDetails
                                            id="PS-12345"
                                            status="pending"
                                            startDate={today}
                                            startHour={14}
                                            endDate={today}
                                            endHour={18}
                                            duration={4}
                                            console="PlayStation 5"
                                            consoleModel="Disc Edition"
                                            price={200}
                                            onPay={handlePay}
                                            onCancel={handleCancel}
                                        />
                                    </TabsContent>

                                    <TabsContent value="confirmed">
                                        <ReservationDetails
                                            id="PS-12346"
                                            status="confirmed"
                                            startDate={addDays(today, 1)}
                                            startHour={10}
                                            endDate={addDays(today, 1)}
                                            endHour={14}
                                            duration={4}
                                            console="PlayStation 5"
                                            consoleModel="Digital Edition"
                                            price={180}
                                            onPay={handlePay}
                                            onCancel={handleCancel}
                                        />
                                    </TabsContent>

                                    <TabsContent value="cancelled">
                                        <ReservationDetails
                                            id="PS-12347"
                                            status="cancelled"
                                            startDate={addDays(today, -2)}
                                            startHour={16}
                                            endDate={addDays(today, -2)}
                                            endHour={20}
                                            duration={4}
                                            console="PlayStation 4"
                                            consoleModel="Pro"
                                            price={140}
                                            onPay={handlePay}
                                            onCancel={handleCancel}
                                        />
                                    </TabsContent>

                                    <TabsContent value="completed">
                                        <ReservationDetails
                                            id="PS-12348"
                                            status="completed"
                                            startDate={addDays(today, -5)}
                                            startHour={12}
                                            endDate={addDays(today, -5)}
                                            endHour={16}
                                            duration={4}
                                            console="PlayStation 4"
                                            consoleModel="Standard"
                                            price={100}
                                            onPay={handlePay}
                                            onCancel={handleCancel}
                                        />
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>

    )
}