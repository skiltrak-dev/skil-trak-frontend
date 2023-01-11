import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { UserStatus } from '@types'

// Icons
import { FaEdit } from 'react-icons/fa'

// components
import {
    Typography,
    Card,
    Button,
    LoadingAnimation,
    AssessmentCourse,
    DownloadableFile,
    NoData,
} from '@components'
import {
    useGetRTOCoursesQuery,
    useGetAssessmentToolByCourseQuery,
    useUpdateAssessmentToolArchiveMutation,
} from '@queries'
import { useContextBar, useJoyRide } from '@hooks'
import { AddAssessmentToolCB } from '../../../components/sections/subAdmin/UsersContainer/SubAdminRtosContainer/SubAdminRtosProfile/contextBar'
// import {AssessmentCourse} from

export const AssessmentsToolsContainer = () => {
    const router = useRouter()
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(
        null
    )

    const contextBar = useContextBar()

    const rtoCourses = useGetRTOCoursesQuery()
    const getAssessmentTools = useGetAssessmentToolByCourseQuery(
        {
            id: Number(selectedCourseId),
            status: UserStatus.Approved,
        },
        { skip: !selectedCourseId }
    )
    const [archiveAssessmentTool, archiveAssessmentToolResult] =
        useUpdateAssessmentToolArchiveMutation()

    const onAddAssessment = () => {
        contextBar.setTitle('Add Assessment')
        contextBar.setContent(<AddAssessmentToolCB />)
        contextBar.show()
    }
    //  ADD ASSESSMENT JOY RIDE - END
    const joyride = useJoyRide()
    useEffect(() => {
        if (rtoCourses.isSuccess) {
            setSelectedCourseId(
                selectedCourseId
                    ? rtoCourses?.data?.data?.find(
                          (c: any) => c?.id === selectedCourseId
                      )?.id
                    : rtoCourses?.data?.data[0]?.id
            )
        }
    }, [rtoCourses])

    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 2 })
            }, 1200)
        }
    }, [])

    //  ADD ASSESSMENT JOY RIDE - END

    const actions = (assessment: any) => {
        return (
            <div className="flex gap-x-2 ">
                <a href={assessment?.file} target="blank" rel="noreferrer">
                    <Typography variant="tableCell" color="text-blue-600">
                        Download
                    </Typography>
                </a>

                <div
                    className="cursor-pointer"
                    onClick={() => {
                        archiveAssessmentTool(assessment?.id)
                    }}
                >
                    <Typography variant="tableCell" color="text-[#7081A0]">
                        Archive
                    </Typography>
                </div>
                {/* <div
                    onClick={() => {
                    }}
                >
                    <FaEdit className="text-[#686DE0] cursor-pointer" />
                </div> */}
            </div>
        )
    }
    return (
        <div>
            <div className="mb-2">
                <Typography variant="muted" color="text-gray-400">
                    *You can access all your assessment tools by clicking on
                    download button for your placement unit you are currently
                    enrolled in.
                </Typography>
            </div>
            <Card noPadding>
                <div className="flex">
                    <div className="w-[25%] border-r">
                        <div className={`p-3.5`}>
                            <Typography variant="label" color="text-black">
                                Select a Course
                            </Typography>
                        </div>
                        {rtoCourses?.isLoading || rtoCourses?.isFetching ? (
                            <LoadingAnimation size={85} />
                        ) : rtoCourses?.data?.data &&
                          rtoCourses?.data?.data?.length > 0 ? (
                            rtoCourses?.data?.data?.map((course: any) => (
                                <AssessmentCourse
                                    code={course?.code}
                                    name={course?.title}
                                    id={course.id}
                                    onClick={() =>
                                        setSelectedCourseId(course?.id)
                                    }
                                    selectedCourseId={selectedCourseId}
                                />
                            ))
                        ) : (
                            <NoData text={'No Courses were Found'} />
                        )}
                    </div>
                    <div className="w-[75%]">
                        <div className="flex justify-end gap-x-2.5 p-4">
                            <div id="add-assessments">
                                <Button
                                    variant="primary"
                                    text="ADD ASSESSMENT"
                                    onClick={() => {
                                        onAddAssessment()
                                    }}
                                />
                            </div>
                            <Button
                                variant="dark"
                                text="VIEW ARCHIVED"
                                onClick={() => {
                                    router.push(
                                        `/portals/rto/tasks/assessment-tools/view-archived`
                                    )
                                }}
                            />
                        </div>

                        <div className={`border-b border-t p-4`}>
                            <div className="flex justify-between">
                                <Typography variant="label" color="text-black">
                                    Description
                                </Typography>
                                <Typography variant="label" color="text-black">
                                    Action
                                </Typography>
                            </div>
                        </div>
                        <div className="p-2 min-h-[260px]">
                            {getAssessmentTools?.isLoading ||
                            getAssessmentTools?.isFetching ? (
                                <LoadingAnimation size={80} />
                            ) : getAssessmentTools?.data &&
                              getAssessmentTools?.data?.length > 0 ? (
                                getAssessmentTools?.data?.map(
                                    (assessment: any) => (
                                        <DownloadableFile
                                            actions={() => actions(assessment)}
                                            key={assessment?.id}
                                            name={assessment?.title}
                                            archivedView={false}
                                        />
                                    )
                                )
                            ) : (
                                <NoData
                                    text={'No Assessment tools were found'}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </Card>
            <div className="mt-6">
                <Typography variant="label" color="text-black">
                    What you want to do here?
                </Typography>
            </div>
            <div>
                <Typography variant="label" color="text-blue-500">
                    <Link href="#">
                        I want to access my assessment tool for enrolled course
                    </Link>
                </Typography>
            </div>
        </div>
    )
}
