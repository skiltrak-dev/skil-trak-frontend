// IndustryRequestRejected.tsx
import { NoData, Typography } from '@components'
import React from 'react'
import { TextInfo } from '../../TextInfo'
import { CourseTooltip } from './CourseToolTip'
import { RejectionNote } from './RejectionNote'

interface IndustryRequestRejectedProps {
    data: any[]
    formatDate: (date: string) => string
}

export const IndustryRequestRejected = ({
    data,
    formatDate,
}: IndustryRequestRejectedProps) => {
    console.log('data:::: rejected', data)
    return (
        <div>
            <Typography variant="subtitle">Industry Sector Rejected</Typography>
            {data?.map((item) => (
                <>
                    {item?.industryApproval?.map((industryReq: any) => (
                        <div
                            key={industryReq?.id}
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
                                        {/* {industryReq?.courses?.map(
                                            (course: any) => (
                                                <CourseTooltip
                                                    key={course.id}
                                                    course={course}
                                                />
                                            )
                                        )} */}
                                        <Typography variant="small">
                                            {industryReq?.course?.title} -{' '}
                                            {industryReq?.course?.code}
                                        </Typography>
                                    </div>
                                </div>

                                <TextInfo
                                    title="Department HOD"
                                    text={industryReq?.actionBy?.name ?? 'NA'}
                                />
                            </div>

                            <RejectionNote note={industryReq?.note} />

                            <div className="flex justify-center text-xs mt-2">
                                DATE:{' '}
                                <span className="font-semibold ml-1">
                                    {formatDate(industryReq?.updatedAt ?? 'NA')}
                                </span>
                            </div>
                        </div>
                    ))}
                </>
            ))}
        </div>
    )
}
