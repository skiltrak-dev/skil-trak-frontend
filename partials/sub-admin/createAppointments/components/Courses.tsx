import { Course } from '@types'
import { useEffect } from 'react'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { Card, LoadingAnimation, NoData, Typography } from '@components'

export const Courses = ({
    selectedCourse,
    setSelectedCourse,
    selectedAppointmentForUser,
}: {
    selectedCourse: number | null
    selectedAppointmentForUser?: number | null
    setSelectedCourse: (value: number) => void
}) => {
    const router = useRouter()

    const getAppointmentCourses = CommonApi.Courses.getAppointmentCourses(
        Number(selectedAppointmentForUser)
    )

    useEffect(() => {
        if (
            getAppointmentCourses?.data &&
            getAppointmentCourses?.data?.length > 0
        ) {
            setSelectedCourse(
                Number(router?.query?.courseId) ||
                    getAppointmentCourses?.data?.[0]?.id
            )
        }
    }, [getAppointmentCourses, router])

    return (
        <Card noPadding>
            <div className="p-4 w-full">
                <Typography variant="subtitle">Select Course*</Typography>
                {getAppointmentCourses?.isError && (
                    <NoData
                        text="There is some technical issue, Try Refresh the page!"
                        isError
                    />
                )}
                {getAppointmentCourses?.isLoading ? (
                    <LoadingAnimation size={80} />
                ) : getAppointmentCourses?.data &&
                  getAppointmentCourses?.data?.length > 0 &&
                  getAppointmentCourses?.isSuccess ? (
                    <div className="grid grid-cols-6 gap-3">
                        {getAppointmentCourses?.data?.map((c: Course) => (
                            <Card noPadding>
                                <div
                                    className={`h-20 flex flex-col justify-center p-3 rounded-xl border border-gray-400 ${
                                        selectedCourse === c?.id
                                            ? 'bg-primaryNew-dark'
                                            : ''
                                    } cursor-pointer`}
                                    onClick={() => {
                                        setSelectedCourse(c?.id)
                                    }}
                                >
                                    <Typography
                                        variant="small"
                                        medium
                                        center
                                        color={
                                            selectedCourse === c?.id
                                                ? 'text-white'
                                                : ''
                                        }
                                    >
                                        {c?.code}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        medium
                                        center
                                        color={
                                            selectedCourse === c?.id
                                                ? 'text-white'
                                                : ''
                                        }
                                    >
                                        {c?.title}
                                    </Typography>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    getAppointmentCourses?.isSuccess && (
                        <NoData
                            text={
                                selectedAppointmentForUser
                                    ? 'There is no course available against this course'
                                    : 'Please Select a Appointment For User to view courses'
                            }
                        />
                    )
                )}
            </div>
        </Card>
    )
}
