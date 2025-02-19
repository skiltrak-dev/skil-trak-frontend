import { Typography } from '@components'
import { StudentDetailCard } from '@partials/common/StudentProfileDetail/ContextBarComponents/StudentDetail/StudentDetailCard'
import { getGender } from '@utils'
import React from 'react'

export const StudentRelatedInfo = ({ profile }: { profile: any }) => {
    return (
        <div>
            <Typography variant="xs" medium>
                Student Related info{' '}
            </Typography>

            {/*  */}
            <div className="mt-1.5 flex flex-col gap-y-1.5">
                <div className="grid grid-cols-2 gap-[5px]">
                    <StudentDetailCard
                        title="Course"
                        detail={profile?.courses?.[0]?.title || '---'}
                    />
                    <StudentDetailCard
                        title="Current Work"
                        detail={profile?.currentWork || '---'}
                    />
                    <StudentDetailCard
                        title="Driving License"
                        detail={profile?.haveDrivingLicense ? 'Yes' : 'No'}
                    />
                    <StudentDetailCard
                        title="Transport"
                        detail={profile?.haveTransport ? 'Yes' : 'No'}
                    />
                </div>
            </div>
        </div>
    )
}
