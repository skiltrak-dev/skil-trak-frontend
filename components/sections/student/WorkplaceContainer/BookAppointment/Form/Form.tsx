import { Select, TextInput } from '@components/inputs'
import { Typography } from '@components/Typography'
import { useEffect, useState } from 'react'

import { AppointmentType } from '@partials/appointmentType'

// query
import {
    useGetCoordinatorsForStudentQuery,
    useGetStudentCoursesQuery,
} from '@queries'
import { Card } from '@components/cards'
import { UserRoles } from '@constants'

type Props = {
    setType: Function
    type: number | null
    selectedCoordinator: { label: string; value: number } | null
    setSelectedCoordinator: Function
    setSelectedCourse: Function
}

export const Form = ({
    setType,
    type,
    setSelectedCourse,
    selectedCoordinator,
    setSelectedCoordinator,
}: Props) => {
    // const [appointmentTypeId, setAppointmentTypeId] = useState<number | null>(
    //     null
    // )
    const [coordinatorsOptions, setCoordinatorsOptions] = useState<any | null>(
        []
    )

    const coordinators = useGetCoordinatorsForStudentQuery()
    const studentCourses = useGetStudentCoursesQuery()

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

    const coursesOptions = studentCourses?.data?.map((course: any) => ({
        label: course.title,
        value: course.id,
    }))

    return (
        <div>
            <Card>
                <AppointmentType
                    setAppointmentTypeId={setType}
                    appointmentFor={UserRoles.STUDENT}
                />
            </Card>

            <div className="my-2" />

            <Card>
                <Typography variant={'label'} color={'text-gray-700'}>
                    Appointment Information
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-5 mb-5">
                    <Select
                        name="coordinator"
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
                        value={selectedCoordinator}
                    />
                    <Select
                        name="course"
                        label="Course(s)"
                        placeholder="Select Your Choice"
                        options={coursesOptions}
                        loading={studentCourses.isLoading}
                        disabled={studentCourses.isLoading}
                        onChange={(e: any) => {
                            setSelectedCourse(e)
                        }}
                        onlyValue
                    />
                </div>
            </Card>

            <div className="my-2" />

            <Card>
                <Typography variant={'label'} color={'text-gray-700'}>
                    Workplace Information
                </Typography>
                <div className="flex flex-col md:flex-row md:items-center gap-x-5 mt-2">
                    <TextInput
                        name="name"
                        placeholder="Name"
                        label="Name"
                        id="name"
                    />
                    <TextInput
                        name="email"
                        placeholder="Email"
                        label="Email"
                        id="email"
                    />
                    <TextInput
                        name="phone"
                        placeholder="Phone"
                        label="Phone"
                        id="phone"
                    />
                </div>

                <TextInput
                    name="address"
                    placeholder="Address"
                    label="Address"
                    id="address"
                />
            </Card>
        </div>
    )
}
