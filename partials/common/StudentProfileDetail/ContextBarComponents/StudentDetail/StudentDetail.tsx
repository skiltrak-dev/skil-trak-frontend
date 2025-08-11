import moment from 'moment'
import { Student } from '@types'
import { getGender } from '@utils'
import { Typography } from '@components'
import { useMaskText, useNotification } from '@hooks'

import { UserProfileDetailCard } from '@partials/common/Cards'
import { StudentPhoneInfo } from './StudentPhoneInfo'

export const StudentDetail = ({ profile }: { profile: Student }) => {
    const { notification } = useNotification()

    return (
        <div className="mt-5">
            <Typography variant="small" medium>
                Student Details
            </Typography>

            <div className="mt-1.5 flex flex-col gap-y-1.5">
                <div className="flex items-center gap-x-[5px]">
                    <UserProfileDetailCard
                        title="Student ID"
                        detail={useMaskText({
                            key: profile?.studentId,
                        })}
                        onClick={() => {
                            navigator.clipboard.writeText(profile?.studentId)
                            notification.success({
                                title: 'Copied',
                                description: 'Student Id Copied',
                            })
                        }}
                    />
                    <UserProfileDetailCard
                        title="Student Batch"
                        detail={profile?.batch}
                    />
                </div>

                <StudentPhoneInfo profile={profile} />

                <div>
                    <UserProfileDetailCard
                        title="Account Created"
                        detail={moment(profile?.createdAt).format(
                            'Do MMM YYYY - hh:mm:ss A'
                        )}
                    />
                </div>
                <div className="flex items-center gap-x-[5px]">
                    <UserProfileDetailCard
                        title="Age Range"
                        detail={profile?.age}
                    />
                    <UserProfileDetailCard
                        title="Gender"
                        detail={
                            profile?.gender
                                ? String(getGender(profile?.gender))
                                : '---'
                        }
                    />
                </div>
                <div>
                    <UserProfileDetailCard
                        title="Location"
                        detail={`${profile?.addressLine1}`}
                        // detail={
                        //     profile?.isAddressUpdated
                        //         ? profile?.addressLine1
                        //         : `${profile?.addressLine1}, ${profile?.suburb
                        //               ?.replace(/Australia/i, '')
                        //               ?.replace(
                        //                   new RegExp(
                        //                       stateCodes?.join('|'),
                        //                       'g'
                        //                   ),
                        //                   ''
                        //               )} ${profile?.state}, Australia` || 'NA'
                        // }
                    />
                </div>

                <div>
                    <UserProfileDetailCard
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
