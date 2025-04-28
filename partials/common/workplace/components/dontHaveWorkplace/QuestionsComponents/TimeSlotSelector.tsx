import React from 'react'

const timeSlots = ['10 - 1', '1 - 4', '4 - 6']

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
                <button
                    key={slot}
                    onClick={() => onChange(slot)}
                    className={`px-4 py-2 rounded-xl text-sm transition ${
                        selectedSlot === slot
                            ? 'bg-primaryNew text-white shadow'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    type="button"
                >
                    {slot}
                </button>
            ))}
        </div>
    )
}
