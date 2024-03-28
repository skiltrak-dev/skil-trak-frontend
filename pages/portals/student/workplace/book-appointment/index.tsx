import moment from 'moment'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { Button, TextArea, Card, ShowErrorNotifications } from '@components'
import { Form, TimeSlots } from '@components/sections'
import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { FormProvider, useForm } from 'react-hook-form'

// query
import {
    CommonApi,
    useGetCoordinatorsAvailabilityQuery,
    useGetWorkplaceIndustriesQuery,
} from '@queries'

// hooks
import { useNotification } from '@hooks'
import { FaExclamationTriangle } from 'react-icons/fa'
import { getUserCredentials } from '@utils'

type Props = {}

const BookAppointment: NextPageWithLayout = (props: Props) => {
    const router = useRouter()

    const [type, setType] = useState<number | null>(null)
    const [selectedCoordinator, setSelectedCoordinator] = useState<{
        label: string
        value: number
    } | null>(null)
    const [selectedCourse, setSelectedCourse] = useState<{
        label: string
        value: number
    } | null>(null)
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
    const [selectedTime, setSelectedTime] = useState<any | null>(null)

    // query
    // query
    const coordinatorAvailability = useGetCoordinatorsAvailabilityQuery(
        Number(selectedCoordinator?.value),
        { skip: !selectedCoordinator }
    )
    const studentTimeSlotes =
        CommonApi.Appointments.useAppointmentsAvailableSlots(
            {
                id: Number(type),
                date: selectedDate?.toISOString(),
                byUser: Number(selectedCoordinator?.value),
                forUser: getUserCredentials()?.id,
            },
            { skip: !type || !selectedDate || !selectedCoordinator }
        )
    const [createAppointment, createAppointmentResult] =
        CommonApi.Appointments.createAppointment()
    const workplace = useGetWorkplaceIndustriesQuery()

    // hooks
    const { notification } = useNotification()

    useEffect(() => {
        if (createAppointmentResult.isSuccess) {
            notification.success({
                title: 'Appointment Created Successfully',
                description: 'Appointment Created Successfully',
            })
            router.push('/portals/student/workplace/appointments')
        }
    }, [createAppointmentResult.isSuccess])

    const formMethods = useForm({
        mode: 'all',
    })

    useEffect(() => {
        if (workplace?.data && workplace?.data?.length) {
            const industry = workplace?.data[0]?.industries.find(
                (i: any) => i.applied
            )?.industry
            const workplceResult = {
                name: industry?.user?.name,
                email: industry?.user?.email,
                phone: industry?.phoneNumber,
                address: industry?.addressLine1,
            }
            for (const key in workplceResult) {
                formMethods.setValue(
                    key,
                    workplceResult[key as keyof typeof workplceResult]
                )
            }
        }
    }, [workplace])

    const onSubmit = (values: any) => {
        const time = moment(selectedTime, ['h:mm A']).format('HH:mm')
        // let date = selectedDate
        // date?.setDate(date.getDate() + 1)
        createAppointment({
            ...values,
            type,
            date: selectedDate,
            ...selectedTime,
            coordinator: values.coordinator.value,
            appointmentFor: values.coordinator.value,
            isApproved: false,
        })
    }

    return (
        <>
            <ShowErrorNotifications result={createAppointmentResult} />
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <Form
                        setType={setType}
                        type={type}
                        setSelectedCourse={setSelectedCourse}
                        selectedCoordinator={selectedCoordinator}
                        setSelectedCoordinator={setSelectedCoordinator}
                    />

                    <div className="my-2" />

                    <Card>
                        {!selectedCoordinator ? (
                            <div className="bg-orange-100 text-orange-600 flex gap-x-2 items-center px-4 py-2 rounded-md mb-3">
                                <span className="bg-orange-600 p-2 text-orange-100 rounded-md">
                                    <FaExclamationTriangle />
                                </span>
                                <p>
                                    Please select a <em>WBT Coordinator</em> to
                                    view availabilities
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-sm text-gray-400 mb-2">
                                    * If you still not able to see
                                    availabilities try to change{' '}
                                    <em>Appointment Type</em>
                                </p>
                            </div>
                        )}

                        <TimeSlots
                            setSelectedDate={setSelectedDate}
                            selectedDate={selectedDate}
                            setSelectedTime={setSelectedTime}
                            selectedTime={selectedTime}
                            appointmentAvailability={
                                coordinatorAvailability.data?.availabilities[0]
                                    ?.availability
                            }
                            userAvailabilities={studentTimeSlotes?.data}
                            loading={
                                studentTimeSlotes?.isLoading ||
                                studentTimeSlotes?.isFetching
                            }
                            bookedAppointment={
                                coordinatorAvailability.data?.booked
                            }
                        />
                    </Card>

                    <div className="my-2" />

                    <Card>
                        <TextArea
                            name={'note'}
                            label={'Note'}
                            placeholder={'Your note for appointment'}
                        />
                    </Card>

                    <div className="my-4" />

                    <Button
                        submit
                        variant={'info'}
                        text={'book Appointment'}
                        loading={createAppointmentResult.isLoading}
                        disabled={
                            createAppointmentResult.isLoading ||
                            !selectedDate ||
                            !selectedTime ||
                            !type ||
                            !selectedCoordinator ||
                            !selectedCourse
                        }
                    />
                </form>
            </FormProvider>
        </>
    )
}
BookAppointment.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout pageTitle={{ title: 'Workplace' }}>{page}</StudentLayout>
    )
}

export default BookAppointment
