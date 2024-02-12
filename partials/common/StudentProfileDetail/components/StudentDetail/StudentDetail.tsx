import { Typography } from '@components'
import React from 'react'
import { StudentDetailCard } from './StudentDetailCard'
import { Student } from '@types'
import moment from 'moment'
import { getGender } from '@utils'

export const StudentDetail = ({ profile }: { profile: Student }) => {
    return (
        <div className="mt-5">
            <Typography variant="small" medium>
                Student Details
            </Typography>

            <div className="mt-1.5 flex flex-col gap-y-1.5">
                <div className="flex items-center gap-x-[5px]">
                    <StudentDetailCard
                        title="Student ID"
                        detail={profile?.studentId}
                    />
                    <StudentDetailCard
                        title="Student Batch"
                        detail={profile?.batch}
                    />
                </div>
                <div>
                    <StudentDetailCard
                        title="Phone Number"
                        detail={profile?.phone}
                    />
                </div>
                <div>
                    <StudentDetailCard
                        title="Account Created"
                        detail={moment(profile?.createdAt).format(
                            'Do MMM YYYY - hh:mm:ss A'
                        )}
                    />
                </div>
                <div className="flex items-center gap-x-[5px]">
                    <StudentDetailCard
                        title="Age Range"
                        detail={profile?.age}
                    />
                    <StudentDetailCard
                        title="Gender"
                        detail={String(getGender(profile?.gender))}
                    />
                </div>
                <div>
                    <StudentDetailCard
                        title="Location"
                        detail={`${profile?.suburb}, ${profile?.state}, ${profile?.addressLine1}`}
                    />
                </div>

                <div>
                    <StudentDetailCard
                        title="Student Type"
                        detail={
                            profile?.isInternational
                                ? 'International'
                                : 'Domestic'
                        }
                    />
                </div>
            </div>
        </div>
    )
}
