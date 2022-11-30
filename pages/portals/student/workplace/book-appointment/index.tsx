import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { AppointmentType, Form, TimeSlots } from '@components/sections'
import { Button, TextArea } from '@components'
import { useForm, FormProvider } from 'react-hook-form'

// query
import {
    useCreateAppointmentMutation,
    useGetCoordinatorsAvailabilityQuery,
} from '@queries'

// hooks
import { useNotification } from '@hooks'

type Props = {}

const BookAppointment: NextPageWithLayout = (props: Props) => {
    const router = useRouter()

    const [daysAvailability, setDaysAvailability] = useState<any[] | null>(null)
    const [timeAvailability, setTimeAvailability] = useState<any[] | null>(null)
    const [type, setType] = useState<number | null>(null)
    const [selectedCoordinator, setSelectedCoordinator] = useState<{
        label: string
        value: number
    } | null>(null)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<any | null>(null)

    // query
    // query
    const coordinatorAvailability = useGetCoordinatorsAvailabilityQuery(
        {
            id: type,
            user: selectedCoordinator?.value,
        },
        { skip: !type || !selectedCoordinator }
    )
    const [createAppointment, createAppointmentResult] =
        useCreateAppointmentMutation()

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
    const onSubmit = (values: any) => {
        const meridiem = selectedTime ? selectedTime?.split(' ')[1] : ''
        const getTime = selectedTime?.split(' ')[0]
        const getHour = Number(getTime.split(':')[0])
        const getMins = getTime.split(':')[1]
        const time =
            meridiem === 'am'
                ? `${getTime}:00`
                : meridiem === 'pm'
                ? getHour === 12
                    ? `${getTime}:00`
                    : `${getHour + 12}:${getMins}:00`
                : ''

        createAppointment({
            ...values,
            coordinator: values.coordinator.value,
            type,
            date: selectedDate,
            time,
            appointmentFor: 4,
        })
    }

    return (
        <>
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <Form
                        setDaysAvailability={setDaysAvailability}
                        setTimeAvailability={setTimeAvailability}
                        setType={setType}
                        type={type}
                        selectedCoordinator={selectedCoordinator}
                        setSelectedCoordinator={setSelectedCoordinator}
                    />
                    <TimeSlots
                        // daysAvailability={daysAvailability}
                        // timeAvailability={timeAvailability}
                        setSelectedDate={setSelectedDate}
                        selectedDate={selectedDate}
                        setSelectedTime={setSelectedTime}
                        selectedTime={selectedTime}
                        coordinatorAvailability={coordinatorAvailability.data}
                    />

                    <div className="mt-5">
                        <TextArea name={'note'} />
                    </div>

                    <Button
                        submit
                        variant={'info'}
                        text={'book Appointment'}
                        loading={createAppointmentResult.isLoading}
                        disabled={
                            createAppointmentResult.isLoading ||
                            !selectedDate ||
                            !selectedTime ||
                            !type
                        }
                    />
                </form>
            </FormProvider>
        </>
    )
}
BookAppointment.getLayout = (page: ReactElement) => {
    return <StudentLayout title="Workplace">{page}</StudentLayout>
}

export default BookAppointment
