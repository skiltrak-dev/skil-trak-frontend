import { SidebarCalendar } from '@components'
import { Typography } from '@components/Typography'
import { Paginate } from '@components'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import moment from 'moment'

// queries
import { useGetCoordinatorsAvailabilityQuery } from '@queries'

type Props = {
    daysAvailability: any
    timeAvailability: any
    setSelectedDate: Function
    selectedDate: Date | null
    setSelectedTime: Function
    selectedTime: any
    coordinatorAvailability: any
}

export const TimeSlots = ({
    daysAvailability,
    timeAvailability,
    setSelectedDate,
    selectedDate,
    selectedTime,
    setSelectedTime,
    coordinatorAvailability,
}: Props) => {
    const [currentItems, setCurrentItems] = useState(Array())
    const [slotsTime, setSlotsTime] = useState(Array())

    useEffect(() => {
        setSlotsTime([])
    }, [daysAvailability])

    const timeSlots = useCallback(() => {
        const days = [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
        ]
        const getFormatedHours = (hour) => {
            return hour <= 12 ? hour : hour - 12
        }
        const selectedDay = moment(selectedDate, 'YYYY-MM-DD').format(
            'YYYY-MM-DD'
        )
        const bookedSlot = coordinatorAvailability?.booked?.filter?.(
            (b) => b.date === selectedDay
        )
        const bookedSlotsTime = bookedSlot?.map((t) => t.time)
        console.log('bookedSlotsTime', bookedSlotsTime)
        console.log(
            'aaaaaaaa',
            moment(selectedDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
        )
        const findDay = selectedDate && days[selectedDate?.getDay()]
        const selectedDayAvailability =
            coordinatorAvailability?.availabilities?.find(
                (t: any) => t.day === findDay
            )
        const opening = selectedDayAvailability
            ? selectedDayAvailability.openingTime
            : '00:00'
        const closing = selectedDayAvailability
            ? selectedDayAvailability.closingTime
            : '00:00'
        const start = Number(opening.split(':')[0])
        const end = Number(closing.split(':')[0])
        const startMins = Number(opening.split(':')[1])
        const endMins = Number(closing.split(':')[1])
        const startHourIndex = Math.ceil(startMins / 15)
        const endHourIndex = Math.ceil(endMins / 15)

        let slots = []

        for (let i = start; i < end; i++) {
            const meridiem = i < 12 ? 'am' : 'pm'
            const hour = getFormatedHours(i)

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
        return slots.slice(startHourIndex)
    }, [selectedDate])

    useEffect(() => {
        const slots = timeSlots()
        setSlotsTime(slots)
    }, [timeSlots])

    return (
        <div className="mt-5">
            {/* {currentItems.map((d) => d)} */}

            <Typography variant="small" color="text-gray-400">
                Select Time Slot
            </Typography>
            <div className="flex gap-x-8 mt-1">
                <div className="w-2/6">
                    <SidebarCalendar
                        enbledDays={daysAvailability || []}
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

                            <Paginate
                                data={slotsTime}
                                itemsPerPage={12}
                                setCurrentItems={setCurrentItems}
                            />
                        </div>
                        <Typography variant="muted" color="text-gray-400">
                            Please select one of time slot from below given list
                        </Typography>
                        <div className="grid grid-cols-3 gap-2 mt-2.5">
                            {currentItems.map((timeSlot, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setSelectedTime(timeSlot.time)
                                    }}
                                    className={`group hover:bg-orange-500 hover:border-none ${
                                        selectedTime === timeSlot.time
                                            ? 'bg-orange-500 border-none'
                                            : 'bg-white border'
                                    } w-26 h-11 flex justify-center items-center border-orange-500 px-4 py-3 rounded-lg cursor-pointer`}
                                >
                                    <Typography
                                        variant="body"
                                        color={`group-hover:text-white ${
                                            selectedTime === timeSlot.time
                                                ? 'text-white'
                                                : 'text-orange-500'
                                        }`}
                                    >
                                        {timeSlot.time}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
