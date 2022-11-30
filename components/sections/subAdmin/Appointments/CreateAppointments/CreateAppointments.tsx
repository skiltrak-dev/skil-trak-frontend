import { useEffect, useState, useCallback } from 'react'

// components
import { Arrow, CreateAppointmentCard, SearchUser } from './components'
import { TimeSlots } from '@components/sections/student'
import { Card, Typography, Button, TextInput } from '@components'
import { AppointmentFor, AppointmentWithData } from './appointmentData'

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

    useEffect(() => {
        setAppointmentWith(
            AppointmentWithData.filter((f) =>
                f.type.includes(selectedPerson.selectedAppointmentFor || '')
            )
        )
        setSelectedPerson({ ...selectedPerson, selectedAppointmentWith: null })
    }, [selectedPerson.selectedAppointmentFor])

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
                    <Typography variant={'label'}>
                        What kind of appointment you want to book?
                    </Typography>
                    <div className="flex justify-between items-center gap-x-3 w-5/12">
                        {['Industry Consultation', 'Placement Strategy'].map(
                            (text) => (
                                <CreateAppointmentCard
                                    key={text}
                                    text={text}
                                    selected={selectedAppointmentType}
                                    onClick={() => {
                                        setSelectedAppointmentType(text)
                                    }}
                                />
                            )
                        )}
                    </div>

                    {/*  */}
                    <div className="my-5">
                        <Typography variant={'small'} color={'text-gray-500'}>
                            Select Time Slot
                        </Typography>
                        {/* <TimeSlots
                                setSelectedDate={() => {}}
                                selectedDate={new Date()}
                                setSelectedTime={() => {}}
                                selectedTime={''}
                                coordinatorAvailability={''}
                            /> */}
                    </div>
                    <TextInput
                        name="notes"
                        label={'Notes'}
                        placeholder={'Notes'}
                    />
                    <div className="mt-4">
                        <Button text={'Book Appointment'} variant={'info'} />
                    </div>
                </Card>
            </div>
        </>
    )
}
