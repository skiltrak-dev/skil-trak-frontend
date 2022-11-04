import { useRouter } from 'next/router'

//Links
import Link from 'next/link'
// components
import { Button, Card, Typography, LoadingAnimation } from '@components'

import { AssessmentCourse, DownloadableFile } from './components'
// queries
import { useGetAssessmentToolQuery, useGetAssessmentToolDetailQuery } from '@queries'
import { useState } from 'react'
type AssessmentsToolsProps = {
    role: 'RTO' | 'Student'
    actions?: Function
}

export const AssessmentsTools = ({ role, actions }: AssessmentsToolsProps) => {
    const [selectedCourseId, setSelectedCourseId] = useState(1);

    const router = useRouter()
    const { data, isLoading, isError } = useGetAssessmentToolQuery('archived')
    const { data: assessmentToolDetail, isLoading: isLoadingDetail } = useGetAssessmentToolDetailQuery(selectedCourseId)
    console.log("Details", assessmentToolDetail);





    console.log("first", data);


    return (
        <>
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
                        {data?.map((course: any, index: any) => (
                            <>
                                <AssessmentCourse
                                    code={course.course.code}
                                    name={course.course.title}
                                    id={course.id}
                                    onClick={() => setSelectedCourseId(course.id)}
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
                                            router.push('/rto/tasks/assessment-tools/view-archived')
                                        }}
                                    />
                                </div>
                            </>
                        )}
                        <div
                            className={`${role === 'RTO'
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
                            ) : 
                                <DownloadableFile
                                    actions={() => actions(assessmentToolDetail?.course.id)}
                                    role={role}
                                    key={assessmentToolDetail?.id}
                                    name={assessmentToolDetail?.course?.title}
                                    archivedView={false}
                                />
                            }
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
        </>
    )
}
