import { ActionButton } from '@components/buttons'

export const StepAppointmentBooked = () => {
    return (
        <div className="border border-violet-500  px-2 py-3 rounded-md text-sm">
            <p className="text-violet-500 font-medium text-sm">
                Appointment Booked
            </p>
            <p className="text-gray-500 text-sm">
                Your appointment has been booked with Industry
            </p>

            <div className="mt-2">
                <ActionButton variant="link" simple>
                    Check Appointment Section
                </ActionButton>
            </div>
        </div>
    )
}
