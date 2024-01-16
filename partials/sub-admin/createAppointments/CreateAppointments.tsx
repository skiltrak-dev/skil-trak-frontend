import { useRouter } from 'next/router'
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'

// components
import {
    Button,
    Card,
    Modal,
    ShowErrorNotifications,
    TextInput,
    Typography,
} from '@components'
import { TimeSlots } from '@components/sections/student'
import { useNotification } from '@hooks'
import { AppointmentType } from '@partials/appointmentType'
import { getUserCredentials } from '@utils'
import { AppointmentFor, AppointmentWithData, Courses } from './components'

// query
import { RequiredStar } from '@components/inputs/components'
import { UserRoles } from '@constants'
import { Arrow, CreateAppointmentCard, SearchUser } from '@partials/common'
import { CommonApi, SubAdminApi, useAvailabilityListQuery } from '@queries'
import {
    AppointmentDataType,
    AppointmentUserEnum,
    SelectedPerson,
    SelectedTimeType,
    SelectedUserType,
    SubadminAvailabilitiesList,
} from '@types'

export const CreateAppointments = () => {
    const router = useRouter()
    const query = Object.keys(router.query)?.length > 0

    const [selectedPerson, setSelectedPerson] = useState<SelectedPerson>({
        selectedAppointmentFor: AppointmentUserEnum.RTO,
        selectedAppointmentWith: '' as AppointmentUserEnum,
    })

    const [user, setUser] = useState<UserRoles>()
    const [modal, setModal] = useState<ReactNode | null>(null)

    const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

    const [appointmentWith, setAppointmentWith] = useState<
        AppointmentDataType[] | null
    >(null)

    const [selectedAppointmentType, setSelectedAppointmentType] = useState<
        string | null
    >(null)
    const [selectedUser, setSelectedUser] = useState<SelectedUserType>({
        selectedAppointmentForUser: null,
        selectedAppointmentWithUser: null,
    })
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<SelectedTimeType | null>(
        null
    )
    const [note, setNote] = useState<string>('')
    const [appointmentTypeId, setAppointmentTypeId] = useState<number | null>(
        null
    )
    const [slots, setSlots] = useState(true)

    // const [date, setDate] = useState(selectedDate)
    // useEffect(() => {
    //     let date = selectedDate
    //     date?.setDate(date.getDate() + 1)
    //     setDate(date)
    // }, [selectedDate])

    // date?.setDate(date.getDate() + 1)

    const { notification } = useNotification()

    const roles = [UserRoles.INDUSTRY, UserRoles.RTO, UserRoles.STUDENT]

    const queryUser = Object.keys(router?.query)[0] as UserRoles
    useEffect(() => {
        if (query && roles.includes(queryUser)) {
            setUser(queryUser)
            const appointmentFor = AppointmentFor?.find(
                (appointment) =>
                    appointment?.text?.toLocaleLowerCase() === queryUser
            )?.text
            setSelectedPerson({
                ...selectedPerson,
                selectedAppointmentFor: appointmentFor as AppointmentUserEnum,
            })
        }
    }, [router, query, queryUser])

    useEffect(() => {
        if (selectedPerson.selectedAppointmentWith === 'Self') {
            const user = getUserCredentials()
            setSelectedUser({
                ...selectedUser,
                selectedAppointmentWithUser: user?.id,
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
            id: Number(appointmentTypeId),
            date: selectedDate?.toISOString(),
            forUser: Number(selectedUser.selectedAppointmentForUser),
            byUser: Number(selectedUser.selectedAppointmentWithUser),
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
    const availabilityList = useAvailabilityListQuery(undefined, {
        skip: selectedPerson.selectedAppointmentWith !== 'Self',
        refetchOnMountOrArgChange: true,
    })

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
                f.type.includes(
                    selectedPerson.selectedAppointmentFor ||
                        ('' as AppointmentUserEnum)
                )
            )
        )
        setSelectedPerson((person: SelectedPerson) => ({
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
            router.back()
        }
    }, [createAppointmentResult])

    useEffect(() => {
        setSelectedTime(null)
    }, [appointmentTypeId])

    const onSubmit = () => {
        if (profile.data?.canBookAppointments) {
            setSlots(false)
            // let date = selectedDate
            // date?.setDate(date.getDate() + 1)
            createAppointment({
                ...(selectedTime as any),
                date: selectedDate as Date,
                note,
                type: Number(appointmentTypeId),
                course: Number(selectedCourse),
                appointmentFor: Number(selectedUser.selectedAppointmentForUser),
                appointmentBy: Number(selectedUser.selectedAppointmentWithUser),
            })
        } else {
            onShowModal()
        }
    }

    return (
        <>
            {modal}
            <ShowErrorNotifications result={createAppointmentResult} />
            <div className="bg-blue-400 rounded-lg px-2 py-2 mb-2">
                <Typography color={'text-white'} variant={'label'}>
                    Staric (*) fields are required
                </Typography>
            </div>
            <div className="flex flex-col gap-y-2">
                <Card>
                    <div className="grid grid-cols-7">
                        <div className="col-span-3">
                            <div className="flex gap-x-1">
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-500'}
                                >
                                    Book Appointment For
                                </Typography>
                                <div className="-mt-1">
                                    <RequiredStar />
                                </div>
                            </div>
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
                            <div className="flex gap-x-1">
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-500'}
                                >
                                    Book Appointment With
                                </Typography>
                                <div className="-mt-1">
                                    <RequiredStar />
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-x-3">
                                {appointmentWith?.map(({ text, icon }) => (
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
                    <Courses
                        setSelectedCourse={setSelectedCourse}
                        rto={
                            selectedPerson.selectedAppointmentFor ===
                            AppointmentUserEnum.RTO
                                ? selectedUser.selectedAppointmentForUser
                                : null
                        }
                    />
                </Card>

                <SearchUser
                    user={user as UserRoles}
                    query={query}
                    selectedUser={selectedUser}
                    selectedPerson={selectedPerson}
                    setSelectedUser={setSelectedUser}
                    setSelectedPerson={setSelectedPerson}
                />

                <Card>
                    <div className="flex justify-between items-center gap-x-3 w-full">
                        <AppointmentType
                            setAppointmentTypeId={setAppointmentTypeId}
                            appointmentFor={
                                selectedPerson.selectedAppointmentFor?.toLocaleLowerCase() as AppointmentUserEnum
                            }
                        />
                    </div>

                    {/*  */}
                    <div className="my-5">
                        <TimeSlots
                            setSelectedDate={setSelectedDate}
                            selectedDate={selectedDate}
                            setSelectedTime={setSelectedTime}
                            selectedTime={selectedTime}
                            appointmentAvailability={
                                availabilityList?.data as SubadminAvailabilitiesList[]
                            }
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
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
