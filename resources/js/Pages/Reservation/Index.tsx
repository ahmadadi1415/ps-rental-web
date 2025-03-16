import ReservationsTable, { Reservation } from "@/Components/reservation/reservations-table";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";

interface ReservationPageProps {
    reservationOrders: []
}

export default function Index(props: ReservationPageProps) {

    function convertToReservation(data: any): Reservation {
        return {
            id: data.id.toString(), // Convert ID to string
            date: new Date(data.order_date), // Convert order_date to Date
            timeSlot: `${new Date(data.start_time).toLocaleTimeString()} - ${new Date(data.end_time).toLocaleTimeString()}`, // Format time slot
            console: data.product.console_type, // Get console type from product
            price: data.total_amount, // Use total_amount as price
            status: data.status, // Use status directly
            createdAt: new Date(data.created_at), // Convert created_at to Date
        };
    }

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
                            <div className="flex justify-between items-center">
                                <h1 className="text-3xl font-bold">My Reservations</h1>
                                <Link href={route('reservation.create')}>
                                    <Button>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Add Reservation
                                    </Button>
                                </Link>
                            </div>

                            <ReservationsTable reservations={props.reservationOrders.map(convertToReservation)} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}