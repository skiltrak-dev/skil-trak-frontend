import React from 'react'
import Link from 'next/link'
import { Student } from '@types'
import { MdSnooze } from 'react-icons/md'
import { FiPhoneOff } from 'react-icons/fi'
import { LuFlagTriangleRight } from 'react-icons/lu'
import { Tooltip, TooltipPosition, Typography } from '@components'
import { getUserCredentials, maskText } from '@utils'

export const StudentWPCellInfo = ({ student }: { student: Student }) => {
    const subadminId = getUserCredentials()?.id
    return (
        <div>
            <Typography variant="muted" color="text-gray-700">
                {maskText(student?.studentId, 2) ?? 'N/A'}
            </Typography>
            <div className="flex items-center gap-x-2">
                <Typography variant="small" semibold>
                    {student?.user?.name ?? 'N/A'}
                </Typography>
                <div className="flex items-center gap-x-2">
                    {student?.isSnoozed && (
                        <div className="w-5 h-5 flex items-center justify-center rounded relative group">
                            <MdSnooze size={20} className="text-red-500" />
                            <Tooltip>Snoozed Student</Tooltip>
                        </div>
                    )}
                    {student?.nonContactable && (
                        <div className="group relative bg-red-600 p-1 rounded-full flex items-center justify-center">
                            <FiPhoneOff className="text-white text-[10px]" />
                            <Tooltip position={TooltipPosition.left}>
                                Not Contactable
                            </Tooltip>
                        </div>
                    )}
                    {student?.hasIssue && (
                        <div className="group relative">
                            <LuFlagTriangleRight className="text-red-600 text-xl" />
                            <Tooltip position={TooltipPosition.left}>
                                Flagged Issue
                            </Tooltip>
                        </div>
                    )}
                    {student?.isHighPriority && (
                        <div className="rounded-md whitespace-nowrap px-1 py-0.5 border border-red-400 text-red-400 text-xs font-medium">
                            High Priority
                        </div>
                    )}
                </div>
            </div>
            <Typography variant="small" color="text-gray-500">
                {student?.addressLine1 ?? 'N/A'}
            </Typography>
            {student?.subadmin?.user?.id === subadminId && (
                <Link
                    href={`/portals/sub-admin/students/${student?.id}/detail`}
                    className="text-blue-500 text-xs"
                >
                    View Details
                </Link>
            )}
        </div>
    )
}
