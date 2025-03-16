import ConsoleSelectionCard from "@/Components/reservation/console-selection";
import SessionForm from "@/Components/reservation/session-form";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";

const SESSION_BLOCKS = [
    { id: "morning", label: "09:00-12:00", startTime: "09:00", endTime: "12:00" },
    { id: "afternoon", label: "12:00-15:00", startTime: "12:00", endTime: "15:00" },
    { id: "evening", label: "15:00-18:00", startTime: "15:00", endTime: "18:00" },
    { id: "night", label: "18:00-21:00", startTime: "18:00", endTime: "21:00" },
]

enum ConsoleType {
    PS4 = "PS4",
    PS5 = "PS5",
}

interface CreateReservationFormProps {
    sessionDate: Date | undefined,
    sessionStartTime: string | undefined,
    sessionEndTime: string | undefined,
    selectedConsole: ConsoleType | undefined,

    [key: string]: any
}

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<CreateReservationFormProps>({
        sessionDate: undefined, // Valid date (YYYY-MM-DD)
        sessionStartTime: undefined, // Integer (0-23)
        sessionEndTime: undefined, // Integer (0-23)
        selectedConsole: undefined // Must exist in "products" table
    });

    // State for date and time selection
    const [sessionBlock, setSessionBlock] = React.useState<string | undefined>(undefined)

    // Console selection state
    const [error, setError] = React.useState<string | null>(null)

    // Get the selected session block details
    const getSelectedSessionBlock = React.useCallback(() => {
        if (!sessionBlock) return null
        return SESSION_BLOCKS.find((block) => block.id === sessionBlock) || null
    }, [sessionBlock])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!data.sessionDate) {
            setError("Please select a session date")
            return
        }

        if (!sessionBlock) {
            setError("Please select a session time")
            return
        }

        if (!data.selectedConsole) {
            setError("Please select a console")
            return
        }

        setError(null)

        const selectedSession = getSelectedSessionBlock()
        
        setData('sessionStartTime', selectedSession!.startTime)
        setData('sessionEndTime', selectedSession!.endTime)

        console.log(data);


        alert("Session scheduled successfully!")

        post(route('reservation.store'))
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Reservation
                </h2>
            }
        >
            <Head title="Add Reservation" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
                                <SessionForm
                                    sessionDate={data.sessionDate}
                                    setSessionDate={(value) => setData('sessionDate', value)}
                                    sessionBlock={sessionBlock}
                                    setSessionBlock={setSessionBlock}
                                    error={error}
                                />

                                <ConsoleSelectionCard
                                    sessionDate={data.sessionDate}
                                    sessionBlock={getSelectedSessionBlock()}
                                    selectedConsole={data.selectedConsole}
                                    setSelectedConsole={(value: string) => {
                                            setData('selectedConsole', ConsoleType[value as keyof typeof ConsoleType] ?? undefined);
                                    }}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}