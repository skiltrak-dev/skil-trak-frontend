'use client'

import { DaySelector } from './DaySelector'
import { useFormContext } from 'react-hook-form'
import { TimeSlotSelector } from './TimeSlotSelector'
import { useCallback, useEffect, useState } from 'react'

export const AvailabilitySelector = () => {
    const { watch, setValue } = useFormContext()
    const [selectedDays, setSelectedDays] = useState<string[]>([])
    const [selectedTime, setSelectedTime] = useState<string>('')

    const handleDayChange = useCallback((day: string) => {
        const prevFtn = (prev: any) => prev.filter((d: any) => d !== day)

        setSelectedDays((prev) =>
            day === 'Anyday'
                ? prev.includes(day)
                    ? prevFtn(prev)
                    : [day]
                : prev.includes(day)
                ? prevFtn(prev)
                : [...prev, day]
        )
    }, [])

    const handleTimeChange = useCallback((slot: string) => {
        setSelectedTime(slot)
        // setValue('preferredContactTime', {
        //     timeSlot: selectedTime,
        //     days: selectedDays,
        // })
    }, [])

    useEffect(() => {
        setValue('preferredContactTime', {
            days: selectedDays,
            timeSlot: selectedTime,
        })
    }, [selectedDays, selectedTime, setValue])

    return (
        <div className="w-full max-w-xl mx-auto p-6 border border-dashed border-[#A5A3A9] rounded-[10px]">
            <div className="mb-6">
                <label className="block font-medium mb-4">Select Days</label>
                <DaySelector
                    selectedDays={selectedDays}
                    onChange={handleDayChange}
                />
            </div>
            <div>
                <label className="block font-medium mb-4">
                    Select Time Slot
                </label>
                <TimeSlotSelector
                    selectedSlot={selectedTime}
                    onChange={handleTimeChange}
                />
            </div>
        </div>
    )
}
