import { Typography, useRestrictedData } from '@components'
import { Student } from '@types'
import React from 'react'
import { StudentDetailCard } from './StudentDetailCard'
import { UserRoles } from '@constants'
import { getUserCredentials, maskText } from '@utils'
import { useMaskText } from '@hooks'

export const EmergencyContact = ({
    isHod,
    profile,
}: {
    isHod?: boolean
    profile: Student
}) => {
    const rolesIncludes = [UserRoles.ADMIN, UserRoles.RTO]

    const role = getUserCredentials()?.role


    return (
        <div className="mt-5">
            <Typography variant="small" medium>
                Emergency Contact
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
                            useMaskText({ key: profile?.emergencyPersonPhone }),
                            UserRoles.STUDENT
                        )}
                    />
                </div>
            </div>
        </div>
    )
}
