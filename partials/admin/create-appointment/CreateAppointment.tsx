import {
    Button,
    Card,
    LoadingAnimation,
    TextInput,
    Typography,
} from '@components'
import { TimeSlots } from '@components/sections'
import { useNotification } from '@hooks'
import { AppointmentType } from '@partials/appointmentType'
import {
    Arrow,
    CreateAppointmentCard,
    SearchedUserCard,
    SearchUser,
    SearchUserCard,
} from '@partials/common'
import {
    useSearchUserByIdQuery,
    useSubAdminCreateAppointmentMutation,
    useUserAvailabilitiesQuery,
    CommonApi,
    useAvailabilityListQuery,
} from '@queries'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AppointmentFor, AppointmentWithData } from './components'

export const CreateAppointmentContainer = () => {
    const router = useRouter()
    const query = Object.keys(router.query)?.length > 0

    const [selectedPerson, setSelectedPerson] = useState<any | null>({
        selectedAppointmentFor: 'RTO',
        selectedAppointmentWith: '',
    })

    const [user, setUser] = useState<string>('')
    const [slots, setSlots] = useState(true)

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

    const timeSlots = CommonApi.Appointments.useAppointmentsAvailableSlots(
        {
            id: appointmentTypeId,
            date: selectedDate?.toISOString(),
            forUser: selectedUser.selectedAppointmentForUser,
            byUser: selectedUser.selectedAppointmentWithUser,
        },
        {
            skip:
                !selectedDate ||
                !appointmentTypeId ||
                !selectedUser.selectedAppointmentForUser ||
                !selectedUser.selectedAppointmentWithUser ||
                !slots,
        }
    )
    const [createAppointment, createAppointmentResult] =
        CommonApi.Appointments.createAppointment()
    const availabilityList = useAvailabilityListQuery(
        {},
        {
            skip: selectedPerson.selectedAppointmentWith !== 'Coordinator',
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
        if (timeSlots?.data?.availabilities?.length === 0) {
            notification.error({
                title: 'No Availabilities were found',
                description: 'No Availabilities were found',
            })
        }
    }, [timeSlots])

    useEffect(() => {
        if (createAppointmentResult.isSuccess) {
            notification.success({
                title: 'Appointment Created',
                description: 'Appointment Created Successfully',
            })
            router.push('/portals/admin/appointment-type')
        }
    }, [createAppointmentResult])

    const onSubmit = () => {
        setSlots(false)
        let date = selectedDate
        date?.setDate(date.getDate() + 1)
        createAppointment({
            date,
            note,
            ...selectedTime,
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
                        <Typography variant={'small'} color={'text-gray-500'}>
                            Select Time Slot
                        </Typography>
                        <TimeSlots
                            setSelectedDate={setSelectedDate}
                            selectedDate={selectedDate}
                            setSelectedTime={setSelectedTime}
                            selectedTime={selectedTime}
                            appointmentAvailability={availabilityList?.data}
                            userAvailabilities={timeSlots?.data}
                            loading={
                                timeSlots?.isLoading || timeSlots?.isFetching
                            }
                            subAdmin
                            appointmentWith={
                                selectedPerson?.selectedAppointmentWith
                            }
                            bookedAppointment={timeSlots?.data?.booked}
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
                            // disabled={
                            //     !selectedDate ||
                            //     !selectedPerson.selectedAppointmentFor ||
                            //     !selectedPerson.selectedAppointmentWith ||
                            //     !selectedUser.selectedAppointmentForUser ||
                            //     !selectedUser.selectedAppointmentWithUser ||
                            //     !appointmentTypeId
                            // }
                            loading={createAppointmentResult.isLoading}
                            disabled={createAppointmentResult.isLoading}
                        />
                    </div>
                </Card>
            </div>
        </>
    )
}
