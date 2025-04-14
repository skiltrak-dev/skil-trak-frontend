import { Typography, useRestrictedData } from '@components'
import { UserRoles } from '@constants'
import { useNotification } from '@hooks'
import { Student } from '@types'
import { getUserCredentials, maskText } from '@utils'
import { StudentDetailCard } from './StudentDetailCard'

export const EmergencyContact = ({
    isHod,
    profile,
}: {
    isHod?: boolean
    profile: Student
}) => {
    const { notification } = useNotification()

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
                            maskText(
                                profile?.emergencyPersonPhone.toLocaleLowerCase() !==
                                    'na'
                                    ? profile?.emergencyPersonPhone
                                    : '-----'
                            ),
                            UserRoles.STUDENT
                        )}
                        onClick={() => {
                            if (role !== UserRoles.OBSERVER) {
                                navigator.clipboard.writeText(
                                    profile?.emergencyPersonPhone
                                )

                                notification.success({
                                    title: 'Copied',
                                    description: 'Phone Number Copied',
                                })
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
