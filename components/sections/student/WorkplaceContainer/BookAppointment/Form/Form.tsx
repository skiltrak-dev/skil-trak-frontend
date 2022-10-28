import { useEffect, useState } from 'react'
import { Select, TextArea, TextInput } from '@components/inputs'
import { Typography } from '@components/Typography'

import { AppointmentType } from '../components'
import Image from 'next/image'

// query
import {
    useGetStudentCoursesQuery,
    useGetCoordinatorsForStudentQuery,
} from '@queries'
import { Button } from '@components/buttons'

type Props = {
    setDaysAvailability: Function
    setTimeAvailability: Function
    setType: Function
    type: number | null
    selectedCoordinator: { label: string; value: number } | null
    setSelectedCoordinator: Function
}

const days = [
    {
        day: 'sunday',
        id: 0,
    },
    {
        day: 'monday',
        id: 1,
    },
    {
        day: 'tuesday',
        id: 2,
    },
    {
        day: 'wednesday',
        id: 3,
    },
    {
        day: 'thursday',
        id: 4,
    },
    {
        day: 'friday',
        id: 5,
    },
    {
        day: 'saturday',
        id: 6,
    },
]

export const Form = ({
    setDaysAvailability,
    setTimeAvailability,
    setType,
    type,
    selectedCoordinator,
    setSelectedCoordinator,
}: Props) => {
    // const [appointmentTypeId, setAppointmentTypeId] = useState<number | null>(
    //     null
    // )
    const [coordinatorsOptions, setCoordinatorsOptions] = useState<
        any[] | null
    >([])
    const [coursesOptions, setCoursesOptions] = useState<any[]>([])

    const coordinators = useGetCoordinatorsForStudentQuery(
        {
            id: type,
        },
        { skip: !type }
    )
    const studentCourses = useGetStudentCoursesQuery()

    useEffect(() => {
        setSelectedCoordinator(null)
        setDaysAvailability(null)
        if (coordinators.data && coordinators.isSuccess) {
            const options = coordinators?.data?.map((coordinator: any) => ({
                label: coordinator.name,
                value: coordinator.id,
            }))
            setCoordinatorsOptions(options)
        }
    }, [coordinators])

    useEffect(() => {
        if (studentCourses?.data?.data && studentCourses.isSuccess) {
            const options = studentCourses?.data?.data?.map((course: any) => ({
                label: course.title,
                value: course.id,
            }))
            setCoursesOptions(options)
        }
    }, [studentCourses?.data?.data, studentCourses.isSuccess])

    useEffect(() => {
        if (selectedCoordinator) {
            const coordinator = coordinators?.data?.find(
                (c: any) => c.id === selectedCoordinator.value
            )
            const availability = coordinator.availability.map((a: any) => a.day)
            const daysId = days
                .filter((f) => availability.includes(f.day))
                .map((d) => d.id)
            setDaysAvailability(daysId)
            setTimeAvailability(coordinator.availability)
        }
    }, [selectedCoordinator])

    return (
        <div>
            <AppointmentType setAppointmentTypeId={setType} />
            <Typography variant="small" color="text-gray-400">
                Appointment Information
            </Typography>
            <div className="flex items-center gap-x-5 mb-5">
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
                    onlyValue
                />
            </div>
            <div className="flex items-center gap-x-5">
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
