import { SidebarCalendar } from '@components'
import { Typography } from '@components/Typography'
import { useState } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
type Props = {}

export const TimeSlots = (props: Props) => {
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
    const [selectedTimeSlotId, setSelectedTimeSlotId] = useState('')
    const [selectedDate, setSelectedDate] = useState(null)

    const handleClick = (timeSlot: string, id: string) => {
        console.log('first', selectedTimeSlot)
        console.log('second', selectedTimeSlotId)

        setSelectedTimeSlot(timeSlot)
        setSelectedTimeSlotId(id)
    }


    const timeSlots = [
        {
            time: '09:00 am',
        },
        {
            time: '09:15 am',
        },
        {
            time: '09:30 am',
        },
        {
            time: '09:45 am',
        },
        {
            time: '10:00 am',
        },
        {
            time: '10:15 am',
        },
        {
            time: '10:30 am',
        },
        {
            time: '10:45 am',
        },
        {
            time: '11:00 am',
        },
        {
            time: '11:15 am',
        },
        {
            time: '11:30 am',
        },
        {
            time: '11:45 am',
        },
        {
            time: '12:00 pm',
        },
        {
            time: '12:15 pm',
        },
        {
            time: '12:30 pm',
        },
    ]
    return (
        <div className="mt-5">
            <Typography variant="small" color="text-gray-400">
                Select Time Slot
            </Typography>
            <div className="flex gap-x-8 mt-1">
                <div className="w-2/6">
                    <SidebarCalendar
                        enbledDays={[1]}
                        setSelectedDate={setSelectedDate}
                    />
                </div>
                <div>
                    <div className="flex justify-between">
                        <Typography variant="subtitle" color="text-black">
                            Saturday, 1st January
                        </Typography>
                        <div className="flex items-center">
                            <GrFormPrevious className="text-gray-400 cursor-pointer" />
                            <GrFormNext className="text-gray-400 cursor-pointer" />
                        </div>
                    </div>
                    <Typography variant="muted" color="text-gray-400">
                        Please select one of time slot from below given list
                    </Typography>
                    <div className="grid grid-cols-3 gap-2 mt-2.5">
                        {timeSlots.map((timeSlot, index) => (
                            <div
                                key={index}
                                className={`hover:border-none group hover:bg-orange-500  border bg-white w-26 h-11 flex justify-center items-center border-orange-500 px-4 py-3 rounded-lg`}
                            >
                                <Typography
                                    variant="body"
                                    color="group-hover:bg-orange-500 text-orange-500 group-hover:text-white"
                                >
                                    {timeSlot.time}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
