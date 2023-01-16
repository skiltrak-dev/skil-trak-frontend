import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { Form, TimeSlots } from '@components/sections'
import { AppointmentType } from '@partials/appointmentType'
import { Button, TextArea, Select, ShowErrorNotifications } from '@components'
import { useForm, FormProvider } from 'react-hook-form'

// hooks
import { useNotification } from '@hooks'

// query
import {
    useCreateRTOAppointmentMutation,
    useGetCoordinatorsForRTOQuery,
    useGetCoordinatorsAvailabilityQuery,
    RtoApi,
    CommonApi,
} from '@queries'

type Props = {}

const CreateAppointments: NextPageWithLayout = (props: Props) => {
    const router = useRouter()

    const [type, setType] = useState<number | null>(null)
    const [selectedCoordinator, setSelectedCoordinator] = useState<{
        label: string
        value: number
    } | null>(null)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<any | null>(null)
    const [selectedCourse, setSelectedCourse] = useState<{
        label: string
        value: number
    } | null>(null)

    // query
    const coordinatorAvailability = useGetCoordinatorsAvailabilityQuery(
        Number(selectedCoordinator),
        { skip: !selectedCoordinator }
    )
    const [createAppointment, createAppointmentResult] =
        CommonApi.Appointments.createAppointment()
    const coordinators = useGetCoordinatorsForRTOQuery()
    const rtoCourses = RtoApi.Rto.useProfile()
    const availableSlots = CommonApi.Appointments.useAppointmentsAvailableSlots(
        {
            id: type,
            date: selectedDate?.toISOString(),
            byUser: selectedCoordinator,
        },
        { skip: !type || !selectedDate || !selectedCoordinator }
    )
    // hooks
    const { notification } = useNotification()

    const [coordinatorsOptions, setCoordinatorsOptions] = useState<any | null>(
        []
    )
    const [coursesOptions, setCoursesOptions] = useState<any>([])

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
        if (rtoCourses?.data && rtoCourses.isSuccess) {
            const options = rtoCourses?.data?.courses?.map((course: any) => ({
                label: course.title,
                value: course.id,
            }))
            setCoursesOptions(options)
        }
    }, [rtoCourses?.data?.courses, rtoCourses.isSuccess])

    useEffect(() => {
        if (createAppointmentResult.isSuccess) {
            notification.success({
                title: 'Appointment Created Successfully',
                description: 'Appointment Created Successfully',
            })
            router.push('/portals/rto/tasks/appointments/')
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
            <ShowErrorNotifications result={createAppointmentResult} />
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <AppointmentType setAppointmentTypeId={setType} />
                    <div className="grid grid-cols-3 items-center gap-x-5 mb-5">
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
                        <Select
                            name="course"
                            label="Course(s)"
                            placeholder="Select Your Choice"
                            options={coursesOptions}
                            loading={rtoCourses.isLoading}
                            disabled={rtoCourses.isLoading}
                            onChange={(e: any) => {
                                setSelectedCourse(e)
                            }}
                            onlyValue
                        />
                    </div>
                    <TimeSlots
                        setSelectedDate={setSelectedDate}
                        selectedDate={selectedDate}
                        setSelectedTime={setSelectedTime}
                        selectedTime={selectedTime}
                        userAvailabilities={availableSlots?.data}
                        loading={availableSlots.isLoading}
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
CreateAppointments.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout
            pageTitle={{
                title: 'Create Appointments',
            }}
        >
            {page}
        </RtoLayout>
    )
}

export default CreateAppointments
