import { useEffect, useState, useCallback } from 'react'

// components
import { TimeSlots } from '@components/sections/student'
import {
    Card,
    Typography,
    Button,
    TextInput,
    LoadingAnimation,
} from '@components'
import { AppointmentFor, AppointmentWithData } from './components'
import { AppointmentType } from '@partials/appointmentType'
import { getUserCredentials } from '@utils'
import { useNotification } from '@hooks'

// query
import {
    useUserAvailabilitiesQuery,
    useSubAdminCreateAppointmentMutation,
    useAvailabilityListQuery,
    useGetSubAdminStudentDetailQuery,
    useSearchUserByIdQuery,
} from '@queries'
import { useRouter } from 'next/router'
import { Arrow, CreateAppointmentCard, SearchUser } from '@partials/common'

export const CreateAppointments = () => {
    const router = useRouter()
    const query = Object.keys(router.query)?.length > 0

    const [selectedPerson, setSelectedPerson] = useState<any | null>({
        selectedAppointmentFor: 'RTO',
        selectedAppointmentWith: '',
    })

    const [user, setUser] = useState<string>('')

    const [appointmentWith, setAppointmentWith] = useState<any | null>(null)

    const [selectedAppointmentType, setSelectedAppointmentType] = useState<
        string | null
    >(null)
    const [selectedUser, setSelectedUser] = useState<any | null>({
        selectedAppointmentForUser: '',
        selectedAppointmentWithUser: '',
    })
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<any | null>(null)
    const [note, setNote] = useState<any | null>(null)
    const [appointmentTypeId, setAppointmentTypeId] = useState<string | null>(
        null
    )
    // const [date, setDate] = useState<any | null>(selectedDate)
    // useEffect(() => {
    //     let date = selectedDate
    //     date?.setDate(date.getDate() + 1)
    //     setDate(date)
    // }, [selectedDate])

    // date?.setDate(date.getDate() + 1)

    const { notification } = useNotification()

    useEffect(() => {
        if (query) {
            const user = Object.keys(router?.query)[0]
            setUser(user)
            const appointmentFor = AppointmentFor?.find(
                (appointment) => appointment?.text?.toLocaleLowerCase() === user
            )?.text
            setSelectedPerson({
                ...selectedPerson,
                selectedAppointmentFor: appointmentFor,
            })
        }
    }, [router, query])

    useEffect(() => {
        if (selectedPerson.selectedAppointmentWith === 'Self') {
            const user = getUserCredentials()
            setSelectedUser({
                ...selectedUser,
                selectedAppointmentWithUser: user.id,
            })
        }
    }, [selectedPerson.selectedAppointmentWith])

    const userAvailabilities = useUserAvailabilitiesQuery(
        {
            date: selectedDate?.toISOString(),
            id: appointmentTypeId,
            forUser: selectedUser.selectedAppointmentForUser,
            byUser: selectedUser.selectedAppointmentWithUser,
        },
        {
            skip:
                !selectedDate ||
                !appointmentTypeId ||
                !selectedUser.selectedAppointmentForUser ||
                !selectedUser.selectedAppointmentWithUser,
        }
    )
    const [createAppointment, createAppointmentResult] =
        useSubAdminCreateAppointmentMutation()
    const availabilityList = useAvailabilityListQuery(
        {},
        {
            skip: selectedPerson.selectedAppointmentWith !== 'Self',
        }
    )

    useEffect(() => {
        setAppointmentWith(
            AppointmentWithData.filter((f) =>
                f.type.includes(selectedPerson.selectedAppointmentFor || '')
            )
        )
        setSelectedPerson((person: any) => ({
            ...person,
            selectedAppointmentWith: null,
        }))
    }, [selectedPerson.selectedAppointmentFor])

    useEffect(() => {
        if (userAvailabilities?.data?.availabilities?.length === 0) {
            notification.error({
                title: 'No Availabilities were found',
                description: 'No Availabilities were found',
            })
        }
    }, [userAvailabilities])

    useEffect(() => {
        if (createAppointmentResult.isSuccess) {
            notification.success({
                title: 'Appointment Created',
                description: 'Appointment Created Successfully',
            })
            router.push('/portals/sub-admin/tasks/appointments')
        }
    }, [createAppointmentResult])

    useEffect(() => {
        setSelectedTime(null)
    }, [appointmentTypeId])

    const onSubmit = () => {
        let date = selectedDate
        date?.setDate(date.getDate() + 1)
        createAppointment({
            ...selectedTime,
            date,
            note,
            type: appointmentTypeId,
            appointmentFor: selectedUser.selectedAppointmentForUser,
            appointmentBy: selectedUser.selectedAppointmentWithUser,
        })
    }

    return (
        <>
            <div className="flex flex-col gap-y-2">
                <Card>
                    <div className="grid grid-cols-7">
                        <div className="col-span-3">
                            <Typography
                                variant={'small'}
                                color={'text-gray-500'}
                            >
                                Book Appointment For
                            </Typography>
                            <div className="flex justify-between items-center gap-x-3">
                                {AppointmentFor.map(({ text, icon }) => (
                                    <CreateAppointmentCard
                                        key={text}
                                        text={text}
                                        icon={icon}
                                        selected={
                                            selectedPerson.selectedAppointmentFor
                                        }
                                        onClick={() => {
                                            setSelectedPerson({
                                                ...selectedPerson,
                                                selectedAppointmentFor: text,
                                            })
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        <Arrow />
                        <div className="col-span-3">
                            <Typography
                                variant={'small'}
                                color={'text-gray-500'}
                            >
                                Book Appointment With
                            </Typography>
                            <div className="flex justify-between items-center gap-x-3">
                                {appointmentWith?.map(({ text, icon }: any) => (
                                    <CreateAppointmentCard
                                        key={text}
                                        text={text}
                                        icon={icon}
                                        selected={
                                            selectedPerson.selectedAppointmentWith
                                        }
                                        onClick={() => {
                                            setSelectedPerson({
                                                ...selectedPerson,
                                                selectedAppointmentWith: text,
                                            })
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                <SearchUser
                    user={user}
                    query={query}
                    selectedUser={selectedUser}
                    selectedPerson={selectedPerson}
                    setSelectedUser={setSelectedUser}
                    setSelectedPerson={setSelectedPerson}
                />

                <Card>
                    <div className="flex justify-between items-center gap-x-3 w-5/12">
                        <AppointmentType
                            setAppointmentTypeId={setAppointmentTypeId}
                        />
                    </div>

                    {/*  */}
                    <div className="my-5">
                        <TimeSlots
                            setSelectedDate={setSelectedDate}
                            selectedDate={selectedDate}
                            setSelectedTime={setSelectedTime}
                            selectedTime={selectedTime}
                            appointmentAvailability={availabilityList?.data}
                            userAvailabilities={userAvailabilities?.data}
                            subAdmin
                            appointmentWith={
                                selectedPerson?.selectedAppointmentWith
                            }
                            bookedAppointment={userAvailabilities?.data?.booked}
                        />
                    </div>
                    <TextInput
                        name="notes"
                        label={'Notes'}
                        placeholder={'Notes'}
                        onChange={(e: any) => {
                            setNote(e.target.value)
                        }}
                    />
                    <div className="mt-4">
                        <Button
                            text={'Book Appointment'}
                            variant={'info'}
                            onClick={onSubmit}
                            disabled={
                                !selectedDate ||
                                !selectedPerson.selectedAppointmentFor ||
                                !selectedPerson.selectedAppointmentWith ||
                                !selectedUser.selectedAppointmentForUser ||
                                !selectedUser.selectedAppointmentWithUser ||
                                !appointmentTypeId ||
                                createAppointmentResult.isLoading
                            }
                            loading={createAppointmentResult.isLoading}
                            // disabled={createAppointmentResult.isLoading}
                        />
                    </div>
                </Card>
            </div>
        </>
    )
}
