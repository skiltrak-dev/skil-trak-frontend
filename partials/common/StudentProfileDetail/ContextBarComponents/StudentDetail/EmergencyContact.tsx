import { Typography } from '@components'
import { Student } from '@types'
import React from 'react'
import { StudentDetailCard } from './StudentDetailCard'

export const EmergencyContact = ({ profile }: { profile: Student }) => {
    return (
        <div className="mt-5">
            <Typography variant="small" medium>
                Emergency Contact{' '}
            </Typography>

            <div className="mt-1.5 flex flex-col gap-y-1.5">
                <div className="flex items-center gap-x-[5px]">
                    <StudentDetailCard
                        title="Name"
                        detail={profile?.emergencyPerson}
                    />
                    <StudentDetailCard
                        title="Phone"
                        detail={profile?.emergencyPersonPhone}
                    />
                </div>
            </div>
        </div>
    )
}
