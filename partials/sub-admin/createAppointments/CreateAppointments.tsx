import { useEffect, useState, useCallback } from 'react'

// components
import { TimeSlots } from '@components/sections/student'
import { Card, Typography, Button, TextInput } from '@components'
import {
    AppointmentFor,
    AppointmentWithData,
    Arrow,
    CreateAppointmentCard,
    SearchUser,
} from './components'
import { AppointmentType } from '@partials/appointmentType'
import { getUserCredentials } from '@utils'
import { useNotification } from '@hooks'

// query
import {
    useUserAvailabilitiesQuery,
    useSubAdminCreateAppointmentMutation,
} from '@queries'

export const CreateAppointments = () => {
    const [selectedPerson, setSelectedPerson] = useState<any | null>({
        selectedAppointmentFor: 'RTO',
        selectedAppointmentWith: '',
    })
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

    const { notification } = useNotification()

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
            forUser: selectedUser.selectedAppointmentForUser,
            byUser: selectedUser.selectedAppointmentWithUser,
        },
        {
            skip:
                !selectedUser.selectedAppointmentForUser ||
                !selectedUser.selectedAppointmentWithUser,
        }
    )
    const [appointmentTypeId, setAppointmentTypeId] = useState<string | null>(
        null
    )
    const [createAppointment, createAppointmentResult] =
        useSubAdminCreateAppointmentMutation()

    useEffect(() => {
        setAppointmentWith(
            AppointmentWithData.filter((f) =>
                f.type.includes(selectedPerson.selectedAppointmentFor || '')
            )
        )
        setSelectedPerson({ ...selectedPerson, selectedAppointmentWith: null })
    }, [selectedPerson.selectedAppointmentFor])

    useEffect(() => {
        if (userAvailabilities?.data?.availabilities?.length === 0) {
            notification.error({
                title: 'No Availabilities were found',
                description: 'No Availabilities were found',
            })
        }
    }, [userAvailabilities])

    const onSubmit = () => {
        let date = selectedDate
        date?.setDate(date.getDate() + 1)
        createAppointment({
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

                {selectedPerson?.selectedAppointmentFor && (
                    <SearchUser
                        selectedAppointment={
                            selectedPerson?.selectedAppointmentFor
                        }
                        onClick={(s: any) => {
                            setSelectedUser({
                                ...selectedUser,
                                selectedAppointmentForUser: s.id,
                            })
                        }}
                        selectedUser={selectedUser.selectedAppointmentForUser}
                        type={'For'}
                    />
                )}

                {selectedPerson.selectedAppointmentWith &&
                    selectedPerson.selectedAppointmentWith !== 'Self' && (
                        <SearchUser
                            selectedAppointment={
                                selectedPerson?.selectedAppointmentWith
                            }
                            onClick={(s: any) => {
                                setSelectedUser({
                                    ...selectedUser,
                                    selectedAppointmentWithUser: s.id,
                                })
                            }}
                            selectedUser={
                                selectedUser.selectedAppointmentWithUser
                            }
                            type={'With'}
                        />
                    )}

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
                            appointmentAvailability={
                                userAvailabilities?.data?.availabilities
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
                                !appointmentTypeId
                            }
                        />
                    </div>
                </Card>
            </div>
        </>
    )
}
