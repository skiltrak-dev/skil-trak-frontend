import { Button } from '@components/buttons'
import { Typography } from '@components/Typography'
import React from 'react'
import { BsCheck } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { MdCancel } from 'react-icons/md'

export const StudentAvailability = () => {
    const timeAvailability = [
        {
            day: 'monday',
            morning: false,
            afternoon: true,
            evening: false,
            night: true,
        },
        {
            day: 'tuesday',
            morning: true,
            afternoon: true,
            evening: false,
            night: false,
        },
        {
            day: 'wednesday',
            morning: false,
            afternoon: false,
            evening: true,
            night: false,
        },
        {
            day: 'thursday',
            morning: true,
            afternoon: true,
            evening: false,
            night: false,
        },
        {
            day: 'friday',
            morning: true,
            afternoon: false,
            evening: false,
            night: true,
        },
        {
            day: 'saturday',
            morning: false,
            afternoon: true,
            evening: true,
            night: false,
        },
        {
            day: 'sunday',
            morning: false,
            afternoon: true,
            evening: false,
            night: true,
        },
    ]

    const shifts = ['Day', 'morning', 'afternoon', 'evening', 'night']

    const isAvailable = (availability: any) => {
        return availability ? (
            <BsCheck className="mx-auto text-gray-700" />
        ) : (
            <IoClose className="mx-auto text-gray-300" />
        )
    }

    return (
        <div>
            <Typography variant={'xs'} color={'text-gray-400'}>
                Student Availability
            </Typography>

            <div className="border border-dashed border-gray-400 rounded-lg p-1 flex flex-col justify-between gap-y-3">
                <div>
                    <div className="grid grid-cols-5 gap-4 px-3">
                        {shifts.map((shift, i) => (
                            <Typography
                                key={shift}
                                variant={'xs'}
                                capitalize
                                center
                            >
                                <span className="font-bold">{shift}</span>
                            </Typography>
                        ))}
                    </div>

                    <div className="flex flex-col gap-y-1">
                        {timeAvailability.map((time, i) => (
                            <div
                                key={time.day}
                                className="grid grid-cols-5 gap-4 px-3 rounded-lg border-b border-secondary"
                            >
                                <Typography
                                    capitalize
                                    variant={'xs'}
                                    color={'text-gray-400'}
                                >
                                    {time.day}
                                </Typography>

                                {/* {Object.values(time)
                                    .slice(1)
                                    .map((value: any) => isAvailable(value))} */}
                                {isAvailable(time.morning)}
                                {isAvailable(time.afternoon)}
                                {isAvailable(time.evening)}
                                {isAvailable(time.night)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
