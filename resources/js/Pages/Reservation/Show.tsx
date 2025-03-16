"use client"

import * as React from "react"
import { addDays } from "date-fns"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import ReservationDetails, { ReservationDetailsProps, type ReservationStatus } from "@/Components/reservation/details/reservation-details"
import { toast } from "sonner"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"

interface ReservationProps {
    reservationOrder: any
}

export default function Show(props: ReservationProps) {
    console.log(props.reservationOrder);

    const [reservationData, setReservationData] = React.useState<ReservationDetailsProps | null>(null);

    React.useEffect(() => {
        if (props.reservationOrder) {
            const convertedData = convertToReservationDetails(props.reservationOrder);
            setReservationData(convertedData);
        }
    }, [props.reservationOrder]);

    function convertToReservationDetails(data: any): ReservationDetailsProps {
        console.log(data);

        const startDate = new Date(data.start_time);
        const endDate = new Date(data.end_time);
        const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60); // Duration in hours

        return {
            id: data.id.toString(), // Convert ID to string
            status: data.status as ReservationStatus, // Cast status to ReservationStatus
            startDate: startDate,
            startHour: startDate.getHours(), // Extract hour from start_time
            endDate: endDate,
            endHour: endDate.getHours(), // Extract hour from end_time
            duration: duration, // Calculate duration in hours
            console: data.product.console_type, // Get console type from product
            price: data.total_amount, // Use total_amount as price
            onPay: handlePay,
            onCancel: handleCancel
        };
    }

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

    if (!reservationData) return;

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

                                <ReservationDetails
                                    id={reservationData.id}
                                    status={reservationData.status}
                                    startDate={reservationData.startDate}
                                    startHour={reservationData.startHour}
                                    endDate={reservationData.endDate}
                                    endHour={reservationData.endHour}
                                    duration={reservationData.duration}
                                    console={reservationData.console}
                                    price={reservationData.price}
                                    onPay={handlePay}
                                    onCancel={handleCancel}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}