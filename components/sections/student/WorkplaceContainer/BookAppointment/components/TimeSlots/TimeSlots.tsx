import { SidebarCalendar } from '@components'
import { Typography } from '@components/Typography'
import { Paginate } from '@components'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import moment from 'moment'

// queries
import { useGetCoordinatorsAvailabilityQuery } from '@queries'

type Props = {
    subAdmin?: boolean
    appointmentWith?: string | null
    setSelectedDate: Function
    selectedDate: Date | null
    setSelectedTime: Function
    selectedTime: any
    appointmentAvailability: any
    bookedAppointment: any
    userAvailabilities?: any
}

const days = [
    {
        day: 'sunday',
        id: 0,
    },
    {
        day: 'monday',
        id: 1,
    },
    {
        day: 'tuesday',
        id: 2,
    },
    {
        day: 'wednesday',
        id: 3,
    },
    {
        day: 'thursday',
        id: 4,
    },
    {
        day: 'friday',
        id: 5,
    },
    {
        day: 'saturday',
        id: 6,
    },
]

export const TimeSlots = ({
    subAdmin,
    appointmentWith,
    setSelectedDate,
    selectedDate,
    selectedTime,
    setSelectedTime,
    appointmentAvailability,
    bookedAppointment,
    userAvailabilities,
}: Props) => {
    const [currentItems, setCurrentItems] = useState(Array())
    const [slotsTime, setSlotsTime] = useState(Array())
    const [timeAvailability, setTimeAvailability] = useState(Array())
    const [daysAvailability, setDaysAvailability] = useState(Array())

    useEffect(() => {
        setSlotsTime([])
    }, [appointmentAvailability])

    useEffect(() => {
        // const availability =
        //     coordinatorAvailability?.availabilities[0]?.availability
        const available = appointmentAvailability?.map((a: any) => a.name)

        const daysId = days
            .filter((f) => available?.includes(f.day))
            .map((d) => d.id)
        setDaysAvailability(
            subAdmin
                ? appointmentWith === 'Self'
                    ? daysId
                    : [0, 1, 2, 3, 4, 5, 6]
                : daysId
        )
        setTimeAvailability(appointmentAvailability)
    }, [appointmentAvailability, appointmentWith])

    const timeSlots = useCallback(() => {
        // const days = [
        //     'sunday',
        //     'monday',
        //     'tuesday',
        //     'wednesday',
        //     'thursday',
        //     'friday',
        //     'saturday',
        // ]
        const getIndexData = (text: string, index: number) => {
            return Number(text.split(':')[index])
        }

        const getMeridiem = (hour: number) => {
            return hour < 12 ? 'am' : 'pm'
        }
        const getFormattedHours = (hour: number) => {
            return hour <= 12 ? hour : hour - 12
        }

        const selectedDay = moment(selectedDate, 'YYYY-MM-DD').format(
            'YYYY-MM-DD'
        )
        const bookedSlot = bookedAppointment?.filter?.(
            (b: any) => b.date === selectedDay
        )

        const bookedSlotsTime = bookedSlot?.map((t: any) =>
            moment(t.time, 'hh:mm:ss').format('h:mm a')
        )

        const findDay = selectedDate && days[selectedDate?.getDay()].day
        const selectedDayAvailability = timeAvailability?.find(
            (t: any) => t.name === findDay
        )

        const opening = selectedDayAvailability
            ? selectedDayAvailability.openingTime
            : '00:00'
        const closing = selectedDayAvailability
            ? selectedDayAvailability.closingTime
            : '00:00'
        const start = getIndexData(opening, 0)
        const end = getIndexData(closing, 0)
        const startMins = getIndexData(opening, 1)
        const endMins = getIndexData(closing, 1)
        const startHourIndex = Math.ceil(startMins / 15)
        const endHourIndex = Math.ceil(endMins / 15)

        let slots = []

        for (let i = start; i < end; i++) {
            const meridiem = getMeridiem(i)
            const hour = getFormattedHours(i)

            slots.push(
                { time: `${hour}:00 ${meridiem}` },
                { time: `${hour}:15 ${meridiem}` },
                { time: `${hour}:30 ${meridiem}` },
                { time: `${hour}:45 ${meridiem}` }
            )

            if (endHourIndex > 0 && i == end - 1) {
                for (let j = 0; j <= endHourIndex; j++) {
                    if (j < endHourIndex) {
                        slots.push({
                            time: `${hour + 1}:${
                                j == 0 ? '00' : j !== endHourIndex ? j * 15 : ''
                            } ${meridiem}`,
                        })
                    }
                }
            }
        }
        return slots
            .slice(startHourIndex)
            .filter((t) => !bookedSlotsTime.includes(t.time))
    }, [selectedDate])

    useEffect(() => {
        const slots = timeSlots()
        setSlotsTime(slots)
    }, [timeSlots])

    return (
        <div className="mt-5">
            <Typography variant="small" color="text-gray-400">
                Select Time Slot
            </Typography>
            <div className="flex justify-center gap-x-16 mt-1">
                <div className="w-2/6">
                    <SidebarCalendar
                        // enabledDays={daysAvailability || [1, 2, 3, 4, 5]}
                        enabledDays={[1, 2, 3, 4, 5]}
                        setSelectedDate={setSelectedDate}
                    />
                </div>
                {selectedDate && (
                    <div>
                        <div className="flex justify-between items-center">
                            <Typography variant="subtitle" color="text-black">
                                {moment(
                                    selectedDate?.toISOString(),
                                    'YYYY-MM-DD hh:mm:ss Z'
                                ).format('dddd, Do MMMM')}
                            </Typography>

                            {userAvailabilities &&
                                userAvailabilities?.length > 0 && (
                                    <Paginate
                                        data={userAvailabilities}
                                        itemsPerPage={12}
                                        setCurrentItems={setCurrentItems}
                                    />
                                )}
                        </div>
                        <Typography variant="muted" color="text-gray-400">
                            Please select one of time slot from below given list
                        </Typography>
                        <div className="grid grid-cols-3 gap-2 mt-2.5">
                            {currentItems?.map(
                                (timeSlot: any, index: number) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setSelectedTime(timeSlot)
                                        }}
                                        className={`group hover:bg-orange-500 hover:border-none ${
                                            selectedTime === timeSlot
                                                ? 'bg-orange-500 border-none'
                                                : 'bg-white border'
                                        } w-26 h-11 flex justify-center items-center border-orange-500 px-4 py-3 rounded-lg cursor-pointer`}
                                    >
                                        <Typography
                                            variant="body"
                                            color={`group-hover:text-white ${
                                                selectedTime === timeSlot
                                                    ? 'text-white'
                                                    : 'text-orange-500'
                                            }`}
                                        >
                                            {timeSlot}
                                        </Typography>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
