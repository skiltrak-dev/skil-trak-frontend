import moment from 'moment'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { IndustryLayout } from '@layouts'
import {
    AppointmentUserEnum,
    Course,
    NextPageWithLayout,
    SubAdmin,
} from '@types'

import { Button, Select, ShowErrorNotifications, TextArea } from '@components'
import { TimeSlots } from '@components/sections'
import { AppointmentType } from '@partials/appointmentType'
import { FormProvider, useForm } from 'react-hook-form'

// hooks
import { useNotification } from '@hooks'

// query
import { UserRoles } from '@constants'
import { CommonApi, useIndustryProfileQuery } from '@queries'
import { getUserCredentials } from '@utils'
import { IndustryStudentsLayout } from '@partials/industry'

type Props = {}

const BookAppointment: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    const { data, isSuccess, isLoading } = useIndustryProfileQuery()

    const coursesOptions =
        data?.courses && data?.courses?.length > 0
            ? data?.courses?.map((course: Course) => ({
                  label: course?.title,
                  value: course?.id,
              }))
            : []

    const [type, setType] = useState<number | null>(null)
    const [selectedCoordinator, setSelectedCoordinator] = useState<
        number | null
    >(null)
    const [coordinatorsOptions, setCoordinatorsOptions] = useState<any | null>(
        []
    )
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
    const [selectedTime, setSelectedTime] = useState<any | null>(null)
    const [selectedCourse, setSelectedCourse] = useState<{
        label: string
        value: number
    } | null>(null)

    // query
    const coordinatorAvailability =
        CommonApi.Appointments.useCoordinatorAvailablity(
            Number(selectedCoordinator),
            { skip: !selectedCoordinator }
        )
    const timeSlots = CommonApi.Appointments.useAppointmentsAvailableSlots(
        {
            id: Number(type),
            date: selectedDate?.toISOString(),
            byUser: Number(selectedCoordinator),
            forUser: getUserCredentials()?.id,
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
            const options = coordinators?.data?.map(
                (coordinator: SubAdmin) => ({
                    label: coordinator?.user?.name,
                    value: coordinator?.user?.id,
                })
            )
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
            coordinator: values?.appointmentFor,
            type,
            date,
        })
    }

    return (
        <>
            <ShowErrorNotifications result={createAppointmentResult} />
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <AppointmentType
                        setAppointmentTypeId={setType}
                        appointmentFor={AppointmentUserEnum.Industry}
                    />

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
                            loading={isLoading}
                            disabled={isLoading}
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
                        userAvailabilities={timeSlots?.data}
                        appointmentAvailability={coordinatorAvailability.data}
                        loading={timeSlots?.isLoading}
                        bookedAppointment={coordinatorAvailability.data?.booked}
                    />

                    <div className="mt-5">
                        <TextArea
                            name={'note'}
                            label={'Add Note'}
                            placeholder="Add Note here..."
                        />
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
    return <IndustryStudentsLayout>{page}</IndustryStudentsLayout>
}

export default BookAppointment
