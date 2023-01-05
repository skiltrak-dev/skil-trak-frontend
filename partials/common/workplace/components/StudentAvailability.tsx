import { Button } from '@components/buttons'
import { Typography } from '@components/Typography'
import React, { useEffect, useState } from 'react'
import { BsCheck } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { MdCancel } from 'react-icons/md'

export const StudentAvailability = ({ availability }: any) => {
    const [generalAvailability, setGeneralAvailability] = useState<
        any[] | null
    >(null)
    useEffect(() => {
        const weekdays = [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
        ]
        const days = {
            monday: 1,
            tuesday: 2,
            wednesday: 3,
            thursday: 4,
            friday: 5,
            saturday: 6,
            sunday: 7,
        }
        const studentAvailability = [...availability]

        const availabilityDays = studentAvailability?.map((d) => d.name)
        const filteredDays = weekdays.filter(
            (d) => !availabilityDays.includes(d)
        )
        const filteredAvailability = [
            ...studentAvailability,
            ...filteredDays.map((day) => ({ name: day })),
        ]
        // const filteredAvailability = weekdays.map((day) =>
        //    availabilityDays.includes(day)
        //       ? studentAvailability.find((s) => s.name === day)
        //       : { name: day }
        // )

        setGeneralAvailability(
            filteredAvailability?.sort(
                (a: any, b: any) =>
                    days[a.name as keyof typeof days] -
                    days[b.name as keyof typeof days]
            )
        )
    }, [availability])

    const shifts = ['Day', 'morning', 'afternoon', 'evening', 'night']

    const isAvailable = (availability: boolean) => {
        return availability ? (
            <BsCheck className="mx-auto text-gray-700" />
        ) : (
            <IoClose className="mx-auto text-gray-300" />
        )
    }

    const schedule = ['morning', 'afternoon', 'evening', 'night']

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
                        {generalAvailability?.map((time: any) => (
                            <div
                                key={time.name}
                                className="grid grid-cols-5 gap-4 px-3 rounded-lg border-b border-secondary"
                            >
                                <Typography
                                    capitalize
                                    variant={'xs'}
                                    color={'text-gray-400'}
                                >
                                    {time?.name}
                                </Typography>
                                {schedule?.map((s) => isAvailable(time[s]))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
