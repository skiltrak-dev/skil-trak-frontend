import { Button } from '@components/buttons'
import { TimeSlots } from '@components/sections'
import { Typography } from '@components/Typography'
import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

export const RescheduleAppointmentModal = ({
    onCancel,
    appointment,
}: {
    onCancel: () => void
    appointment: any
}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<any | null>(null)

    return (
        <div className="bg-[#00000050] w-full h-screen flex items-center justify-center fixed top-0 left-0 z-40">
            <div className="relative bg-white rounded-2xl flex flex-col items-center gap-y-6 shadow-xl min-w-[450px] px-16 py-4">
                <FaTimes
                    onClick={onCancel}
                    className="absolute top-3 right-3 text-lg text-gray-500 cursor-pointer"
                />

                <div className="mr-auto">
                    <div className="mb-2">
                        <Typography variant={'subtitle'} left>
                            Reschedule Appointment
                        </Typography>
                    </div>
                    <Typography variant={'muted'}>
                        Appointment Between
                    </Typography>
                    <div className="flex items-center flex-wrap gap-x-1">
                        <Typography variant={'subtitle'}>
                            {appointment?.appointmentFor?.name} (
                            {appointment?.appointmentFor?.role})
                        </Typography>
                        <Typography variant={'muted'}>And</Typography>
                        <Typography variant={'subtitle'}>
                            {appointment?.appointmentBy?.name} (
                            {appointment?.appointmentBy?.role})
                        </Typography>
                    </div>
                </div>
                <TimeSlots
                    setSelectedDate={setSelectedDate}
                    selectedDate={selectedDate}
                    setSelectedTime={setSelectedTime}
                    selectedTime={selectedTime}
                    appointmentAvailability={[{}]}
                    userAvailabilities={[{}]}
                    loading={false}
                />
                <div className="ml-auto">
                    <Button text={'Submit'} onClick={() => {}} />
                </div>
            </div>
        </div>
    )
}
