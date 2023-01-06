import { useEffect, useState } from 'react'
import { Select, TextArea, TextInput } from '@components/inputs'
import { Typography } from '@components/Typography'

import { AppointmentType } from '@partials/appointmentType'
import Image from 'next/image'

// query
import {
    useGetStudentCoursesQuery,
    useGetCoordinatorsForStudentQuery,
} from '@queries'
import { Button } from '@components/buttons'

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
    const [coursesOptions, setCoursesOptions] = useState<any[]>([])

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

    useEffect(() => {
        if (studentCourses?.data && studentCourses.isSuccess) {
            const options = studentCourses?.data?.map((course: any) => ({
                label: course.title,
                value: course.id,
            }))
            setCoursesOptions(options)
        }
    }, [studentCourses?.data])

    return (
        <div>
            <AppointmentType setAppointmentTypeId={setType} />
            <Typography variant="small" color="text-gray-400">
                Appointment Information
            </Typography>
            <div className="flex flex-col md:flex-row md:items-center gap-y-2 gap-x-5 mb-5">
                <Select
                    name="coordinator"
                    label="WBT Coordinator"
                    placeholder="Select Your Choice"
                    options={coordinatorsOptions}
                    loading={coordinators.isLoading}
                    disabled={!coordinatorsOptions || coordinators.isLoading}
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
            <div className="flex flex-col md:flex-row md:items-center gap-x-5">
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
        </div>
    )
}
