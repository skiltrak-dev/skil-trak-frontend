import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { Form, TimeSlots } from '@components/sections'
import { AppointmentType } from '@partials/appointmentType'
import { Button, TextArea, Select } from '@components'
import { useForm, FormProvider } from 'react-hook-form'

// hooks
import { useNotification } from '@hooks'

// query
import {
    CommonApi,
    useCreateIndustryAppointmentMutation,
    useIndustryCoordinatorAvailabilityQuery,
    useGetCoordinatorsForStudentQuery,
} from '@queries'

type Props = {}

const BookAppointment: NextPageWithLayout = (props: Props) => {
    const router = useRouter()

    const [type, setType] = useState<number | null>(null)
    const [selectedCoordinator, setSelectedCoordinator] = useState<
        number | null
    >(null)
    const [coordinatorsOptions, setCoordinatorsOptions] = useState<any | null>(
        []
    )
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<any | null>(null)

    // query
    const coordinatorAvailability =
        CommonApi.Appointments.useCoordinatorAvailablity(
            Number(selectedCoordinator),
            { skip: !selectedCoordinator }
        )
    const timeSlots = CommonApi.Appointments.useAppointmentsAvailableSlots(
        {
            id: type,
            date: selectedDate?.toISOString(),
            byUser: selectedCoordinator,
        },
        { skip: !type || !selectedDate || !selectedCoordinator }
    )
    const coordinators = CommonApi.Appointments.allCoordinators()

    const [createAppointment, createAppointmentResult] =
        CommonApi.Appointments.createAppointment()

    // hooks
    const { notification } = useNotification()

    useEffect(() => {
        setSelectedCoordinator(null)
        if (coordinators.data && coordinators.isSuccess) {
            const options = coordinators?.data?.map((coordinator: any) => ({
                label: coordinator?.user?.name,
                value: coordinator?.user?.id,
            }))
            setCoordinatorsOptions(options)
        }
    }, [coordinators])

    useEffect(() => {
        if (createAppointmentResult.isSuccess) {
            notification.success({
                title: 'Appointment Created Successfully',
                description: 'Appointment Created Successfully',
            })
            router.push('/portals/industry/students/appointments/')
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
            ...selectedTime,
            type,
            date,
        })
    }

    return (
        <>
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <AppointmentType setAppointmentTypeId={setType} />
                    {/* TODO Not getting coordinators */}
                    <Select
                        name="appointmentFor"
                        label="WBT Coordinator"
                        placeholder="Select Your Choice"
                        options={coordinatorsOptions}
                        loading={coordinators.isLoading}
                        disabled={
                            !coordinatorsOptions || coordinators.isLoading
                        }
                        onChange={(e: any) => {
                            setSelectedCoordinator(e)
                        }}
                        onlyValue
                    />
                    <TimeSlots
                        setSelectedDate={setSelectedDate}
                        selectedDate={selectedDate}
                        setSelectedTime={setSelectedTime}
                        selectedTime={selectedTime}
                        userAvailabilities={timeSlots?.data}
                        appointmentAvailability={coordinatorAvailability.data}
                        loading={timeSlots?.isLoading}
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
    return <IndustryLayout>{page}</IndustryLayout>
}

export default BookAppointment
