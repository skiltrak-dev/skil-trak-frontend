import { Button } from '@components'
import React from 'react'

const timeSlots = [
    '10:00 AM - 1:00 PM',
    '1:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
]

type TimeSlotSelectorProps = {
    selectedSlot: string
    onChange: (slot: string) => void
}

export const TimeSlotSelector = ({
    selectedSlot,
    onChange,
}: TimeSlotSelectorProps) => {
    return (
        <div className="flex flex-wrap gap-2 mt-4">
            {timeSlots.map((slot) => (
                <Button
                    key={slot}
                    onClick={() => onChange(slot)}
                    text={slot}
                    variant={selectedSlot === slot ? 'primaryNew' : 'secondary'}
                />
            ))}
        </div>
    )
}
