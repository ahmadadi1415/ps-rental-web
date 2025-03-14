import ReservationsTable from "@/Components/reservation/reservations-table";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";

export default function Index() {
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

                            <ReservationsTable />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}