// CourseRequestRejected.tsx
import { NoData, Typography } from '@components'
import React from 'react'
import { RejectionNote } from './RejectionNote'
import { TextInfo } from '../../TextInfo'
import { CourseTooltip } from './CourseToolTip'

interface CourseRequestRejectedProps {
    data: any[]
    formatDate: (date: string) => string
}

export const CourseRequestRejected = ({
    data,
    formatDate,
}: CourseRequestRejectedProps) => {
    return (
        <div>
            {data?.length > 0 && (
                <Typography variant="subtitle">
                    Course(s) Request Rejected
                </Typography>
            )}
            {data.map((item) => (
                <>
                    {item?.industryCourseApprovals?.length ? (
                        item?.industryCourseApprovals?.map(
                            (industryCourseReq: any) => (
                                <div
                                    key={industryCourseReq?.id}
                                    className="border border-[#6B7280] p-4 rounded-md bg-[#95C6FB26] bg-opacity-15 mt-4 w-full"
                                >
                                    <div className="flex justify-between gap-x-12 items-center w-full">
                                        <TextInfo
                                            title="Industry Name"
                                            text={item?.user?.name}
                                        />

                                        <div>
                                            <Typography
                                                variant="muted"
                                                color="text-gray-500"
                                            >
                                                Courses
                                            </Typography>
                                            <div className="flex items-center gap-x-1 relative gap-y-2 flex-wrap mt-2">
                                                {industryCourseReq?.courses?.map(
                                                    (course: any) => (
                                                        <CourseTooltip
                                                            key={course.id}
                                                            course={course}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <TextInfo
                                            title="Department HOD"
                                            text={
                                                industryCourseReq?.actionBy
                                                    ?.name ?? 'NA'
                                            }
                                        />
                                    </div>

                                    <RejectionNote
                                        note={industryCourseReq?.note}
                                    />

                                    <div className="flex justify-center text-xs mt-2">
                                        DATE:{' '}
                                        <span className="font-semibold ml-1">
                                            {formatDate(
                                                industryCourseReq?.updatedAt ??
                                                    'NA'
                                            )}
                                        </span>
                                    </div>
                                </div>
                            )
                        )
                    ) : (
                        <NoData text="No data found for course(s) request rejected" />
                    )}
                </>
            ))}
        </div>
    )
}
