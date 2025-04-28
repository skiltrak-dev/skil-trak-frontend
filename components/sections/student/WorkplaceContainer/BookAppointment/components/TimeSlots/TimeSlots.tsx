import {
    AuthorizedUserComponent,
    LoadingAnimation,
    Paginate,
    SidebarCalendar,
    TextInput,
} from '@components'
import { RequiredStar } from '@components/inputs/components'
import { Typography } from '@components/Typography'
import { UserRoles } from '@constants'
import { SelectedTimeType, SubadminAvailabilitiesList } from '@types'
import { getUserCredentials } from '@utils'
import moment from 'moment'
import { ChangeEvent, useEffect, useState } from 'react'

// queries
import { RiRestTimeLine } from 'react-icons/ri'

type Props = {
    subAdmin?: boolean
    appointmentWith?: string | null
    setSelectedDate: (date: Date) => void
    selectedDate: Date | null
    setSelectedTime: ({ startTime, endTime }: SelectedTimeType) => void
    selectedTime: SelectedTimeType | null
    appointmentAvailability: SubadminAvailabilitiesList[]
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
    const [isDateOutSideFromScheduleTime, setIsDateOutSideFromScheduleTime] =
        useState<boolean>(false)

    const day = moment(selectedDate).format('dddd')?.toLocaleLowerCase()
    const dayData = appointmentAvailability?.find((d: any) => d?.name === day)

    useEffect(() => {
        const available = appointmentAvailability?.map(
            (a: SubadminAvailabilitiesList) => a?.name
        )

        if (appointmentWith === 'Self') {
            const isTimeInRange = (
                startTime: string,
                endTime: string,
                openingTime: string,
                closingTime: string
            ) => {
                // Parse times using moment
                const selectedStart = moment(startTime, 'HH:mm')
                const selectedEnd = moment(endTime, 'HH:mm')
                const openTime = moment(openingTime, 'HH:mm')
                const closeTime = moment(closingTime, 'HH:mm')

                // Check if the selected times are within the range
                const isStartInRange = selectedStart.isBetween(
                    openTime,
                    closeTime,
                    null,
                    '[]'
                )
                const isEndInRange = selectedEnd.isBetween(
                    openTime,
                    closeTime,
                    null,
                    '[]'
                )

                // Return true only if both start and end times are within the range
                return isStartInRange && isEndInRange
            }
            const isTime = isTimeInRange(
                selectedTime?.startTime + '',
                selectedTime?.endTime + '',
                dayData?.openingTime + '',
                dayData?.closingTime + ''
            )
            setIsDateOutSideFromScheduleTime(!isTime)
        } else {
            setIsDateOutSideFromScheduleTime(false)
        }

        const daysId = days
            .filter((f) => available?.includes(f?.day))
            .map((d) => d?.id)
        setDaysAvailability(
            subAdmin
                ? appointmentWith === 'Self'
                    ? daysId
                    : [0, 1, 2, 3, 4, 5, 6]
                : daysId?.length > 0 && daysId
                ? daysId
                : [0, 1, 2, 3, 4, 5, 6]
        )
        setTimeAvailability(appointmentAvailability)
    }, [appointmentAvailability, appointmentWith, selectedTime, selectedDate])

    const role = getUserCredentials()?.role

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
            <div className="flex flex-col md:flex-row justify-center gap-y-4 gap-x-3 lg:gap-x-16 mt-1 max-w-4xl mx-auto">
                <div className="w-full">
                    <SidebarCalendar
                        enabledDays={daysAvailability || [0, 1, 2, 3, 4, 5, 6]}
                        // enabledDays={[1, 2, 3, 4, 5]}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                </div>
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <Typography variant="subtitle" color="text-black">
                            {moment(
                                selectedDate || new Date(),
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
                            Please{' '}
                            {(role === UserRoles.ADMIN ||
                                role === UserRoles.SUBADMIN) &&
                                'select the time from custom inputs or '}
                            select one of time slot from below given list
                        </Typography>
                    </div>

                    {/* <AuthorizedUserComponent
                        roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                    >
                        <Typography variant="label" color="text-gray-700">
                            Custom Range
                        </Typography>
                        {selectedTime?.startTime && selectedTime?.endTime ? (
                            isDateOutSideFromScheduleTime ? (
                                <div
                                    className={
                                        'bg-primary-light  px-2 rounded py-1 my-1'
                                    }
                                >
                                    <Typography
                                        variant="small"
                                        color={''}
                                        medium
                                    >
                                        Your availability is not between the
                                        selected time, please choose a time
                                        between{' '}
                                        {moment(
                                            dayData?.openingTime,
                                            'HH:mm'
                                        ).format('hh:mm a')}{' '}
                                        to{' '}
                                        {moment(
                                            dayData?.closingTime,
                                            'HH:mm'
                                        ).format('hh:mm a')}
                                    </Typography>
                                </div>
                            ) : null
                        ) : null}
                        <div className="flex items-center gap-x-2">
                            <TextInput
                                name={'startTime'}
                                type={'time'}
                                label={'Start Time'}
                                showError={false}
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ) => {
                                    setSelectedTime({
                                        ...selectedTime,
                                        startTime: e.target.value,
                                    })
                                }}
                            />
                            <TextInput
                                name={'endTime'}
                                type={'time'}
                                label={'End Time'}
                                showError={false}
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ) => {
                                    setSelectedTime({
                                        ...selectedTime,
                                        endTime: e.target.value,
                                    })
                                }}
                            />
                        </div>
                    </AuthorizedUserComponent> */}

                    <div className="mt-3">
                        <Typography variant="label" color="text-gray-700">
                            Pre made Slots
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
