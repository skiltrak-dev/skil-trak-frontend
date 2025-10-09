'use client'

import { DaySelector } from './DaySelector'
import { useFormContext } from 'react-hook-form'
import { TimeSlotSelector } from './TimeSlotSelector'
import { useCallback, useEffect, useState } from 'react'
import { InputErrorMessage } from '@components/inputs/components'

export const AvailabilitySelector = ({ name }: { name: string }) => {
    const formContext = useFormContext()
    const [selectedDays, setSelectedDays] = useState<string[]>([])
    const [selectedTime, setSelectedTime] = useState<string>('')

    console.log({ formContext: formContext.getFieldState(String(name)).error })

    const error =
        formContext &&
        formContext.getFieldState(String(name)).error !== undefined

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
        formContext.setValue('preferredContactTime', {
            days: selectedDays,
            timeSlot: selectedTime,
        })
    }, [selectedDays, selectedTime, formContext.setValue])

    return (
        <div
            className={`w-full max-w-xl mx-auto p-6 border border-dashed rounded-[10px] ${
                error ? 'border-2 border-error' : 'border border-[#A5A3A9]'
            }`}
        >
            <div className="mb-6">
                <label className="block font-medium mb-4 text-sm">
                    Select Days
                </label>
                <DaySelector
                    selectedDays={selectedDays}
                    onChange={handleDayChange}
                />

                <InputErrorMessage name="days" subname={name} />
            </div>
            <div>
                <label className="block font-medium mb-4 text-sm">
                    Select Time Slot
                </label>
                <TimeSlotSelector
                    selectedSlot={selectedTime}
                    onChange={handleTimeChange}
                />
                <InputErrorMessage name="timeSlot" subname={name} />
            </div>
        </div>
    )
}
