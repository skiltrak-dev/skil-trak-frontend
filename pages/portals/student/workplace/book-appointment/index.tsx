import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { Form, TimeSlots } from '@components/sections'
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
        Number(selectedCoordinator?.value),
        { skip: !selectedCoordinator }
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
        const time = moment(selectedTime, ['h:mm A']).format('HH:mm')
        let date = selectedDate
        date?.setDate(date.getDate() + 1)
        createAppointment({
            ...values,
            type,
            date,
            // time,
            coordinator: values.coordinator.value,
            appointmentFor: values.coordinator.value,
        })
    }

    return (
        <>
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <Form
                        setType={setType}
                        type={type}
                        selectedCoordinator={selectedCoordinator}
                        setSelectedCoordinator={setSelectedCoordinator}
                    />
                    <TimeSlots
                        setSelectedDate={setSelectedDate}
                        selectedDate={selectedDate}
                        setSelectedTime={setSelectedTime}
                        selectedTime={selectedTime}
                        appointmentAvailability={
                            coordinatorAvailability.data?.availabilities[0]
                                ?.availability
                        }
                        bookedAppointment={coordinatorAvailability.data?.booked}
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
                            // !selectedTime ||
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
