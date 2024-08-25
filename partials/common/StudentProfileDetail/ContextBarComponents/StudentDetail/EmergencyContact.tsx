import { Typography, useRestrictedData } from '@components'
import { Student } from '@types'
import React from 'react'
import { StudentDetailCard } from './StudentDetailCard'
import { UserRoles } from '@constants'

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
                        detail={useRestrictedData(
                            profile?.emergencyPersonPhone,
                            UserRoles.STUDENT
                        )}
                    />
                </div>
            </div>
        </div>
    )
}
