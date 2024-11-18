import React from 'react'
import { Typography } from '@components'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
import { ApprovedCourseTooltip } from './ApprovedCourseTooltip'
import { ApprovedSectorTooltip } from './ApprovedSectorTooltip'

export const CourseCard = ({ data, isIndustryAcceptance = false }: any) => {
    const approvals = isIndustryAcceptance
        ? data?.industryApproval || []
        : data?.industryCourseApprovals || []

    console.log('data::::::::', data)
    return (
        <div className="flex flex-col gap-4 mt-4">
            {approvals.map((approval: any, index: any) => (
                <div
                    key={approval.id}
                    className="overflow-auto custom-scrollbar"
                >
                    <div className="p-4 bg-gray-50 flex items-center gap-x-2">
                        <ApprovedSectorTooltip
                            courses={approval.courses || []}
                        />
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm">
                            Approved
                        </span>
                        {approval.actionBy && (
                            <div className="flex gap-x-1">
                                <Typography
                                    variant="xxs"
                                    color="text-emerald-500"
                                >
                                    Approved by: {approval.actionBy.name}
                                </Typography>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border rounded-md bg-[#95C6FB26] bg-opacity-15">
                        <div className="flex justify-between gap-x-12 w-full items-center mb-4">
                            <div>
                                <Typography
                                    variant="small"
                                    color="text-gray-600"
                                >
                                    COURSES ({approval.courses?.length || 0})
                                </Typography>
                                {approval.courses?.length > 1 ? (
                                    <ApprovedCourseTooltip
                                        courses={approval.courses}
                                    />
                                ) : (
                                    approval.courses?.[0] && (
                                        <div
                                            className="flex 
                                        "
                                        >
                                            <Typography variant="muted">
                                                {approval.courses[0].title} -{' '}
                                                {approval.courses[0].code}
                                            </Typography>
                                        </div>
                                    )
                                )}
                            </div>
                            {approval?.courses?.length === 1 && (
                                <div className="text-right">
                                    <Typography
                                        variant="small"
                                        color="text-gray-600"
                                    >
                                        Course Hours
                                    </Typography>
                                    <Typography variant="muted" center>
                                        {approval?.courses[0]?.hours}
                                    </Typography>
                                </div>
                            )}

                            {!isIndustryAcceptance && (
                                <div>
                                    <IoCheckmarkDoneOutline
                                        size={25}
                                        className="text-emerald-500"
                                    />
                                </div>
                            )}
                        </div>

                        {!isIndustryAcceptance && (
                            <>
                                <div className="bg-emerald-700 text-white p-4 rounded-md mb-4 flex gap-x-5 items-start">
                                    <div className="mb-2 whitespace-nowrap flex flex-col">
                                        <Typography
                                            variant="small"
                                            color="white"
                                        >
                                            Action Perform
                                        </Typography>
                                        <Typography
                                            variant="label"
                                            color="white"
                                        >
                                            Course Added
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography
                                            variant="label"
                                            color="white"
                                        >
                                            Description
                                        </Typography>
                                        <div title={approval.description}>
                                            <Typography
                                                variant="xs"
                                                color="text-white"
                                            >
                                                {approval.description ||
                                                    'No description available'}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between text-[10px]">
                                    <div>
                                        <span className="text-gray-600">
                                            Coordinator Name:{' '}
                                        </span>
                                        <span>
                                            {approval.addedBy?.name || 'N/A'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">
                                            Reference URL:{' '}
                                        </span>
                                        <span>
                                            {approval.reference?.[0] || 'N/A'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">
                                            DATE:{' '}
                                        </span>
                                        <span>
                                            {approval.updatedAt
                                                ? approval.updatedAt.slice(
                                                      0,
                                                      10
                                                  )
                                                : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
