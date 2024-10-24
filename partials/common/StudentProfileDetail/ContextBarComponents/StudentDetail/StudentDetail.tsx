import {
    AuthorizedUserComponent,
    Typography,
    useIsRestricted,
    useRestrictedData,
} from '@components'
import { useNotification } from '@hooks'
import { CallLogsModal } from '@partials/sub-admin/students/modals'
import { SubAdminApi } from '@queries'
import { Student } from '@types'
import { getGender, getUserCredentials } from '@utils'
import moment from 'moment'
import { ReactElement, useState } from 'react'
import { State } from 'country-state-city'

import { LatestCallAnswer } from './LatestCallAnswer'
import { UserProfileDetailCard } from '@partials/common/Cards'
import { UserRoles } from '@constants'

export const StudentDetail = ({ profile }: { profile: Student }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const role = getUserCredentials()?.role

    const canAccess = useIsRestricted(UserRoles.STUDENT)

    const { notification } = useNotification()

    const [callLog] = SubAdminApi.Student.useStudentCallLog()

    const onViewCallLogs = (e: any) => {
        e.stopPropagation()
        setModal(
            <CallLogsModal
                studentId={profile?.id}
                onCancel={() => {
                    setModal(null)
                }}
            />
        )
    }

    const stateCodes = State.getStatesOfCountry('AU')?.map(
        (state) => state?.isoCode
    )

    return (
        <div className="mt-5">
            {modal}
            <Typography variant="small" medium>
                Student Details
            </Typography>

            <div className="mt-1.5 flex flex-col gap-y-1.5">
                <div className="flex items-center gap-x-[5px]">
                    <UserProfileDetailCard
                        title="Student ID"
                        detail={profile?.studentId}
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
                <div className="border border-[#6B728050] rounded-md">
                    <UserProfileDetailCard
                        border={false}
                        title="Phone Number"
                        detail={useRestrictedData(
                            profile?.phone,
                            UserRoles.STUDENT
                        )}
                        onClick={() => {
                            if (canAccess && role !== UserRoles.OBSERVER) {
                                navigator.clipboard.writeText(profile?.phone)
                                callLog({
                                    student: profile?.id,
                                }).then((res: any) => {
                                    if (res?.data) {
                                        notification.success({
                                            title: 'Called Student',
                                            description: `Called Student with Id: ${profile.studentId}`,
                                        })
                                    }
                                })
                                notification.success({
                                    title: 'Copied',
                                    description: 'Phone Number Copied',
                                })
                            }
                        }}
                    >
                        <AuthorizedUserComponent
                            excludeRoles={[UserRoles.OBSERVER]}
                        >
                            <div
                                className="bg-primaryNew py-1.5 px-2.5 rounded"
                                onClick={onViewCallLogs}
                            >
                                <Typography
                                    variant="xs"
                                    color="text-white"
                                    bold
                                    underline
                                >
                                    Call Log
                                </Typography>
                            </div>
                        </AuthorizedUserComponent>
                    </UserProfileDetailCard>
                    {profile?.callLog?.[0] &&
                    profile?.callLog?.[0]?.isAnswered === null ? (
                        <div className="px-2.5 pb-2 flex justify-between">
                            <Typography
                                normal
                                variant="xs"
                                color="text-gray-500 block"
                            >
                                Last Call Log
                            </Typography>
                            <LatestCallAnswer callLog={profile?.callLog?.[0]} />
                        </div>
                    ) : null}
                </div>
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
                        // detail={`${profile?.addressLine1}`}
                        detail={
                            profile?.isAddressUpdated
                                ? profile?.addressLine1
                                : `${profile?.addressLine1}, ${profile?.suburb
                                      ?.replace(/Australia/i, '')
                                      ?.replace(
                                          new RegExp(
                                              stateCodes?.join('|'),
                                              'g'
                                          ),
                                          ''
                                      )} ${profile?.state}, Australia`
                        }
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
