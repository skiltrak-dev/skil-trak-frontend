import { Typography } from '@components'
import { StudentDetailCard } from '@partials/common/StudentProfileDetail/ContextBarComponents/StudentDetail/StudentDetailCard'
import { getGender } from '@utils'
import React from 'react'

export const EmergencyContact = ({ profile }: { profile: any }) => {
    return (
        <div>
            <Typography variant="xs" medium>
                Emergency Contact
            </Typography>

            {/*  */}
            <div className="mt-1.5 flex flex-col gap-y-1.5">
                <div className="grid grid-cols-2 gap-[5px]">
                    <StudentDetailCard
                        title="Name"
                        detail={profile?.emergencyPerson || '---'}
                    />
                    <StudentDetailCard
                        title="Phone"
                        detail={profile?.emergencyPersonPhone || '---'}
                    />
                </div>
            </div>
        </div>
    )
}
