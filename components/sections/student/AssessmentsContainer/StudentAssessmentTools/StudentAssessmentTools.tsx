import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
// components
import { Button, Card, LoadingAnimation, Typography } from '@components'
import { AssessmentCourse, DownloadableFile } from '..'
// queries
import {
    useGetStudentAssessmentToolQuery,
    useGetStudentCoursesQuery,
} from '@queries'

type Props = {
    role: 'RTO' | 'Student'
    actions?: Function | undefined
}

export const StudentAssessmentTools = ({ role, actions }: Props) => {
    const router = useRouter()
    const [selectedCourseId, setSelectedCourseId] = useState<any | null>(null)
    const {
        data: coursesData,
        isLoading,
        isError,
    } = useGetStudentCoursesQuery()
    const getAssessmentTools = useGetStudentAssessmentToolQuery(
        selectedCourseId,
        {
            skip: !selectedCourseId,
        }
    )
    // console.log("Student_______AssessmentTools", getAssessmentTools);

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

                        {coursesData?.map((course: any, index: any) => (
                            <>
                                <AssessmentCourse
                                    code={course?.course?.code}
                                    name={course?.title}
                                    id={course.id}
                                    onClick={() =>
                                        setSelectedCourseId(course?.id)
                                    }
                                    selectedCourseId={selectedCourseId}
                                />
                            </>
                        ))}
                    </div>
                    <div className="w-[75%]">
                        {role === 'RTO' && (
                            <>
                                <div className="flex justify-end gap-x-2.5 p-4">
                                    <Button
                                        variant="primary"
                                        text="ADD ASSESSMENT"
                                    />
                                    <Button
                                        variant="dark"
                                        text="VIEW ARCHIVED"
                                        onClick={() => {
                                            router.push(
                                                `/portals/sub-admin/users/rtos/profile/7?tab=archived-assessments`
                                            )
                                        }}
                                    />
                                </div>
                            </>
                        )}
                        <div
                            className={`${
                                role === 'RTO'
                                    ? 'border-b border-t'
                                    : 'border-b'
                            } p-4`}
                        >
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
                            {isLoading ? (
                                <LoadingAnimation />
                            ) : (
                                getAssessmentTools?.data?.map(
                                    (assessment: any) => (
                                        <DownloadableFile
                                            key={assessment.id}
                                            actions={() =>
                                                actions
                                                    ? actions(assessment?.id)
                                                    : () => {}
                                            }
                                            name={assessment?.title}
                                            archivedView={false}
                                        />
                                    )
                                )
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
