import { LoadingAnimation, Paginate, SidebarCalendar } from '@components'
import { RequiredStar } from '@components/inputs/components'
import { Typography } from '@components/Typography'
import moment from 'moment'
import { useEffect, useState } from 'react'

// queries
import { RiRestTimeLine } from 'react-icons/ri'

type Props = {
    subAdmin?: boolean
    appointmentWith?: string | null
    setSelectedDate: Function
    selectedDate: Date | null
    setSelectedTime: Function
    selectedTime: any
    appointmentAvailability: any
    bookedAppointment?: any
    userAvailabilities?: any
    loading: boolean
    removeAvailableSlots?: object
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
    loading,
    selectedTime,
    selectedDate,
    setSelectedTime,
    setSelectedDate,
    appointmentWith,
    bookedAppointment,
    userAvailabilities,
    appointmentAvailability,
    removeAvailableSlots,
}: Props) => {
    const [currentItems, setCurrentItems] = useState(Array())
    const [timeAvailability, setTimeAvailability] = useState(Array())
    const [daysAvailability, setDaysAvailability] = useState(Array())

    useEffect(() => {
        setCurrentItems([])
    }, [appointmentAvailability, selectedDate])

    useEffect(() => {
        const available = appointmentAvailability?.map((a: any) => a?.name)

        const daysId = days
            .filter((f) => available?.includes(f?.day))
            .map((d) => d?.id)
        setDaysAvailability(
            subAdmin
                ? appointmentWith === 'Self'
                    ? daysId
                    : [1, 2, 3, 4, 5, 6]
                : daysId?.length > 0 && daysId
                ? daysId
                : [1, 2, 3, 4, 5, 6]
        )
        setTimeAvailability(appointmentAvailability)
    }, [appointmentAvailability, appointmentWith])

    return (
        <div className="">
            <div className="flex gap-x-1">
                <Typography variant={'label'} color={'text-gray-700'}>
                    Select Time Slot
                </Typography>
                <div className="-mt-1">
                    <RequiredStar />
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-y-4 gap-x-16 mt-1">
                <div className="w-full md:w-2/6">
                    <SidebarCalendar
                        enabledDays={daysAvailability || [1, 2, 3, 4, 5]}
                        // enabledDays={[1, 2, 3, 4, 5]}
                        setSelectedDate={setSelectedDate}
                    />
                </div>
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
                    <div>
                        <Typography variant="muted" color="text-gray-400">
                            Please select one of time slot from below given list
                        </Typography>
                    </div>
                    {loading ? (
                        <LoadingAnimation size={80} />
                    ) : currentItems && currentItems?.length > 0 ? (
                        <div className="flex flex-wrap md:grid md:grid-cols-3 gap-2 mt-2.5">
                            {currentItems?.map(
                                (timeSlot: any, index: number) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setSelectedTime({
                                                startTime: timeSlot[0],
                                                endTime: timeSlot[1],
                                            })
                                        }}
                                        className={`group hover:bg-orange-500 hover:border-none ${
                                            selectedTime?.startTime ===
                                            timeSlot[0]
                                                ? 'bg-orange-500 border-none'
                                                : 'bg-white border'
                                        } w-32 h-11 flex justify-center items-center border-orange-500 py-3 rounded-lg cursor-pointer`}
                                    >
                                        <Typography
                                            variant="body"
                                            color={`group-hover:text-white ${
                                                selectedTime?.startTime ===
                                                timeSlot[0]
                                                    ? 'text-white'
                                                    : 'text-orange-500'
                                            }`}
                                        >
                                            {timeSlot[0]}-{timeSlot[1]}
                                        </Typography>
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <div className="p-7 w-80 h-60 border border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center gap-y-5">
                            <RiRestTimeLine className="text-error" size={45} />
                            <Typography
                                center
                                variant={'label'}
                                color={'text-error'}
                            >
                                No Slots, Check another day
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
