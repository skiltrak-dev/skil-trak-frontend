import { useEffect, useState, useCallback } from 'react'

// components
import { TimeSlots } from '@components/sections/student'
import {
    Card,
    Typography,
    Button,
    TextInput,
    LoadingAnimation,
    Modal,
    ShowErrorNotifications,
} from '@components'
import { AppointmentFor, AppointmentWithData, Courses } from './components'
import { AppointmentType } from '@partials/appointmentType'
import { getUserCredentials } from '@utils'
import { useNotification } from '@hooks'

// query
import {
    useUserAvailabilitiesQuery,
    useSubAdminCreateAppointmentMutation,
    useAvailabilityListQuery,
    useGetSubAdminStudentDetailQuery,
    SubAdminApi,
    CommonApi,
} from '@queries'
import { useRouter } from 'next/router'
import { Arrow, CreateAppointmentCard, SearchUser } from '@partials/common'
import { UserRoles } from '@constants'

export const CreateAppointments = () => {
    const router = useRouter()
    const query = Object.keys(router.query)?.length > 0

    const [selectedPerson, setSelectedPerson] = useState<any | null>({
        selectedAppointmentFor: 'RTO',
        selectedAppointmentWith: '',
    })

    const [user, setUser] = useState<string>('')
    const [modal, setModal] = useState<any | null>(null)

    const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

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
    const [slots, setSlots] = useState(true)

    // const [date, setDate] = useState<any | null>(selectedDate)
    // useEffect(() => {
    //     let date = selectedDate
    //     date?.setDate(date.getDate() + 1)
    //     setDate(date)
    // }, [selectedDate])

    // date?.setDate(date.getDate() + 1)

    const { notification } = useNotification()

    const roles = [UserRoles.INDUSTRY, UserRoles.RTO, UserRoles.STUDENT]

    const queryUser = Object.keys(router?.query)[0]
    useEffect(() => {
        if (query && roles.includes(queryUser)) {
            setUser(queryUser)
            const appointmentFor = AppointmentFor?.find(
                (appointment) =>
                    appointment?.text?.toLocaleLowerCase() === queryUser
            )?.text
            setSelectedPerson({
                ...selectedPerson,
                selectedAppointmentFor: appointmentFor,
            })
        }
    }, [router, query, queryUser])

    useEffect(() => {
        if (selectedPerson.selectedAppointmentWith === 'Self') {
            const user = getUserCredentials()
            setSelectedUser({
                ...selectedUser,
                selectedAppointmentWithUser: user.id,
            })
        }
    }, [selectedPerson.selectedAppointmentWith])

    // useEffect(() => {
    //     setSelectedUser({
    //         ...selectedUser,
    //         selectedAppointmentWithUser: '',
    //     })
    // }, [selectedPerson.selectedAppointmentWith])

    // useEffect(() => {
    //     setSelectedUser({
    //         ...selectedUser,
    //         selectedAppointmentForUser: '',
    //     })
    // }, [selectedPerson.selectedAppointmentFor])

    useEffect(() => {
        setSelectedTime(null)
    }, [selectedPerson, selectedUser])

    // const userAvailabilities = useUserAvailabilitiesQuery(
    //     {
    //         date: selectedDate?.toISOString(),
    //         id: appointmentTypeId,
    //         forUser: selectedUser.selectedAppointmentForUser,
    //         byUser: selectedUser.selectedAppointmentWithUser,
    //     },
    //     {
    //         skip:
    //             !selectedDate ||
    //             !appointmentTypeId ||
    //             !selectedUser.selectedAppointmentForUser ||
    //             !selectedUser.selectedAppointmentWithUser ||
    //             !slots,
    //     }
    // )

    const profile = SubAdminApi.SubAdmin.useProfile(undefined, {
        refetchOnMountOrArgChange: true,
    })
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
            skip: selectedPerson.selectedAppointmentWith !== 'Self',
            refetchOnMountOrArgChange: true,
        }
    )

    const onCancel = () => {
        setModal(null)
    }

    const onShowModal = () => {
        if (
            profile?.isSuccess &&
            profile.data &&
            !profile.data?.canBookAppointments
        ) {
            setModal(
                <Modal
                    onConfirmClick={onCancel}
                    title={'Book Appointments'}
                    subtitle={'Book Appointments'}
                    onCancelClick={onCancel}
                >
                    You need to enable Book/Receive Appointments from Setting to
                    recive Book/Receive Appointments
                </Modal>
            )
        }
    }

    useEffect(() => {
        onShowModal()
        return () => {
            setModal(null)
        }
    }, [profile])

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
            router.push('/portals/sub-admin/tasks/appointments')
        }
    }, [createAppointmentResult])

    useEffect(() => {
        setSelectedTime(null)
    }, [appointmentTypeId])

    const onSubmit = () => {
        if (profile.data?.canBookAppointments) {
            setSlots(false)
            let date = selectedDate
            date?.setDate(date.getDate() + 1)
            createAppointment({
                ...selectedTime,
                date,
                note,
                type: appointmentTypeId,
                course: selectedCourse,
                appointmentFor: selectedUser.selectedAppointmentForUser,
                appointmentBy: selectedUser.selectedAppointmentWithUser,
            })
        } else {
            onShowModal()
        }
    }

    return (
        <>
            {modal}
            <ShowErrorNotifications result={createAppointmentResult} />
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

                <Card>
                    <Courses setSelectedCourse={setSelectedCourse} />
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
                            userAvailabilities={timeSlots?.data}
                            removeAvailableSlots={{
                                selectedPerson,
                                selectedUser,
                            }}
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
                            disabled={
                                !selectedDate ||
                                !selectedPerson.selectedAppointmentFor ||
                                !selectedPerson.selectedAppointmentWith ||
                                !selectedUser.selectedAppointmentForUser ||
                                !selectedUser.selectedAppointmentWithUser ||
                                !appointmentTypeId ||
                                !selectedTime ||
                                !selectedCourse ||
                                createAppointmentResult.isLoading
                            }
                            loading={createAppointmentResult.isLoading}
                        />
                    </div>
                </Card>
            </div>
        </>
    )
}
