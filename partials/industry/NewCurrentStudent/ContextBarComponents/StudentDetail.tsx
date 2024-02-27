import { Typography } from '@components'
import { StudentDetailCard } from '@partials/common/StudentProfileDetail/ContextBarComponents/StudentDetail/StudentDetailCard'
import { getGender } from '@utils'
import React from 'react'

export const StudentDetail = ({ profile }: { profile: any }) => {
    return (
        <div>
            <Typography variant="xs" medium>
                Student Details
            </Typography>

            {/*  */}
            <div className="mt-1.5 flex flex-col gap-y-1.5">
                <div className="flex items-center gap-x-[5px]">
                    <StudentDetailCard
                        title="Student ID"
                        detail={profile?.student?.studentId}
                    />
                    <StudentDetailCard
                        title="Student Batch"
                        detail={profile?.student?.batch}
                    />
                </div>
                <StudentDetailCard
                    title="Phone Number"
                    detail={profile?.student?.phone}
                />
                <StudentDetailCard
                    title="Gender"
                    detail={String(getGender(profile?.student?.gender))}
                />
                <StudentDetailCard
                    title="Location"
                    detail={`${profile?.student?.suburb}, ${profile?.student?.state}, ${profile?.student?.addressLine1}`}
                />
            </div>
        </div>
    )
}
