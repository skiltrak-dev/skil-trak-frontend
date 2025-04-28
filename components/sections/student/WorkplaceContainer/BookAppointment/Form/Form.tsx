import { Select, TextInput } from '@components/inputs'
import { Typography } from '@components/Typography'
import { useEffect, useState } from 'react'

import { AppointmentType } from '@partials/appointmentType'

// query
import {
    useGetCoordinatorsForStudentQuery,
    useGetStudentCoursesQuery,
    useGetWorkplaceIndustriesQuery,
} from '@queries'
import { Card } from '@components/cards'
import { UserRoles } from '@constants'
import { AppointmentUserEnum, Course, OptionType, SubAdmin } from '@types'

type Props = {
    setType: (id: number) => void
    type: number | null
    selectedCoordinator: any
    setSelectedCoordinator: Function
    setSelectedCourse: Function
    selectedCourse?: any
}

export const Form = ({
    setType,
    type,
    setSelectedCourse,
    selectedCoordinator,
    setSelectedCoordinator,
    selectedCourse,
}: Props) => {
    // const [appointmentTypeId, setAppointmentTypeId] = useState<number | null>(
    //     null
    // )

    const [coordinatorsOptions, setCoordinatorsOptions] = useState<any>([])
    const coordinators = useGetCoordinatorsForStudentQuery()
    const studentCourses = useGetStudentCoursesQuery()

    const workplace = useGetWorkplaceIndustriesQuery()
    useEffect(() => {
        if (workplace?.data?.[0]?.assignedTo) {
            const coordinatorOption = [
                {
                    label: workplace?.data?.[0]?.assignedTo.user?.name,
                    value: workplace?.data?.[0]?.assignedTo?.id,
                },
            ]
            setCoordinatorsOptions(coordinatorOption)
            setSelectedCoordinator(coordinatorOption[0]) // default select first
        } else if (coordinators.data && coordinators.isSuccess) {
            const options = coordinators?.data?.map(
                (coordinator: SubAdmin) => ({
                    label: coordinator?.user?.name,
                    value: coordinator?.user?.id,
                })
            )
            setCoordinatorsOptions(options)
        }

        // Preselect Course
        if (studentCourses.data && studentCourses.data.length > 0) {
            const defaultCourse = {
                label: studentCourses.data[0].title,
                value: studentCourses.data[0].id,
            }
            setSelectedCourse(defaultCourse.value)
        }
    }, [workplace?.data, coordinators?.data, studentCourses?.data])

    const coursesOptions = studentCourses?.data?.map((course: Course) => ({
        label: course.title,
        value: course.id,
    }))
    console.log('workplace?.data?.[0]', workplace?.data?.[0])

    const checkIndustry = !workplace?.data?.[0]?.industries?.length

    return (
        <div>
            <Card>
                <AppointmentType
                    setAppointmentTypeId={setType}
                    appointmentFor={AppointmentUserEnum.Student}
                    checkIndustry={checkIndustry}
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
                            !coordinatorsOptions.length ||
                            coordinators.isLoading
                        }
                        onChange={(e: OptionType) => setSelectedCoordinator(e)}
                        value={selectedCoordinator}
                    />
                    <Select
                        name="course"
                        label="Course(s)"
                        placeholder="Select Your Choice"
                        options={coursesOptions}
                        loading={studentCourses.isLoading}
                        disabled={studentCourses.isLoading}
                        onChange={(e: number) => setSelectedCourse(e)}
                        onlyValue
                        value={
                            coursesOptions?.find(
                                (option: any) => option.value === selectedCourse
                            ) || null
                        }
                    />
                </div>
            </Card>

            <div className="my-2" />
            {!checkIndustry && (
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
            )}
        </div>
    )
}
