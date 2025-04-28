'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { DaySelector } from './DaySelector'
import { TimeSlotSelector } from './TimeSlotSelector'
import { useFormContext } from 'react-hook-form'
import { Typography } from '@components'
import { workplaceQuestions } from '../questionListData'

export const AvailabilitySelector = ({ preferredContactTime }: any) => {
    const { watch, setValue } = useFormContext()
    const [selectedDays, setSelectedDays] = useState<string[]>([])
    const [selectedTime, setSelectedTime] = useState<string>('')
    console.log('selectedDays', selectedDays)
    console.log('selectedTime', selectedTime)
    const handleDayChange = useCallback((day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
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
            {' '}
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
