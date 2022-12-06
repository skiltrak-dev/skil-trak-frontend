import { useState, useEffect } from 'react'
import {
    Card,
    NoData,
    Button,
    Typography,
    LoadingAnimation,
    AssessmentCourse,
    DownloadableFile,
} from '@components'

import { UserStatus } from '@types'

import { AdminApi } from '@queries'

export const AssessmentTools = ({ rto }: any) => {
    const [courses, setCourses] = useState<any | null>(null)

    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(
        null
    )

    useEffect(() => {
        setCourses(rto?.data?.courses)
    }, [rto])

    const getAssessmentTools = AdminApi.Rtos.useRtoAssessmentTools(
        {
            rto: Number(rto?.data?.id),
            course: Number(selectedCourseId),
        },
        { skip: !selectedCourseId }
    )

    const actions = (assessment: any) => {
        return (
            <div className="flex gap-x-2 ">
                <a href={assessment?.file} target="blank" rel="noreferrer">
                    <Typography variant="tableCell" color="text-blue-600">
                        Download
                    </Typography>
                </a>

                {/* <div
                    className="cursor-pointer"
                    onClick={() => {
                        archiveAssessmentTool(assessment?.id)
                    }}
                >
                    <Typography variant="tableCell" color="text-[#7081A0]">
                        Archive
                    </Typography>
                </div> */}
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
        <Card noPadding>
            <div className="flex">
                <div className="w-[25%] border-r">
                    <div className={`p-3.5`}>
                        <Typography variant="label" color="text-black">
                            Select a Course
                        </Typography>
                    </div>
                    {rto?.isLoading ? (
                        <LoadingAnimation size={85} />
                    ) : courses && courses?.length > 0 ? (
                        courses?.map((course: any) => (
                            <AssessmentCourse
                                code={course?.code}
                                name={course?.title}
                                id={course.id}
                                onClick={() => setSelectedCourseId(course.id)}
                                selectedCourseId={selectedCourseId}
                            />
                        ))
                    ) : (
                        <NoData text={'No Courses were Found'} />
                    )}
                </div>
                <div className="w-[75%]">
                    <div className="flex justify-end gap-x-2.5 p-4">
                        {/* <Button
                            variant="primary"
                            text="ADD ASSESSMENT"
                            onClick={() => {
                                onAddAssessment()
                            }}
                        /> */}
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
                        {getAssessmentTools?.isLoading ? (
                            <LoadingAnimation size={80} />
                        ) : getAssessmentTools?.data &&
                          getAssessmentTools?.data?.length > 0 ? (
                            getAssessmentTools?.data?.map((assessment: any) => (
                                <DownloadableFile
                                    actions={() => actions(assessment)}
                                    key={assessment?.id}
                                    name={assessment?.title}
                                    archivedView={false}
                                />
                            ))
                        ) : (
                            <NoData text={'No Assessment tools were found'} />
                        )}
                    </div>
                </div>
            </div>
        </Card>
    )
}
