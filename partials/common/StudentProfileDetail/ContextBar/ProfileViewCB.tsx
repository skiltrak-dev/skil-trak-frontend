import {
    AuthorizedUserComponent,
    HideRestrictedData,
    StudentAvatar,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { ViewProfileVisitorsModal } from '@partials/common/modal'
import { Student, SubAdmin } from '@types'
import { getUserCredentials, maskText } from '@utils'
import { ReactNode, useState } from 'react'
import {
    AssignToMeStudent,
    ContactStatus,
    EmergencyContact,
    ProblamaticStudent,
    ProfileLinks,
    ProfilePriority,
    StudentDetail,
    StudentExpireTime,
    StudentStatus,
} from '../ContextBarComponents'

export const ProfileViewCB = ({
    profile,
    subadmin,
}: {
    profile: Student
    subadmin?: SubAdmin
}) => {
    const [modal, setModal] = useState<ReactNode | null>(null)

    const onCancelModal = () => setModal(null)

    const role = getUserCredentials()?.role

    return (
        <div>
            {modal}
            <div className="flex justify-between">
                <div>
                    <StudentAvatar
                        name={profile?.user.name}
                        imageUrl={profile?.user?.avatar}
                        gender={profile?.gender}
                    />
                </div>
                <AuthorizedUserComponent excludeRoles={[UserRoles.OBSERVER]}>
                    <ProfileLinks profile={profile} />
                </AuthorizedUserComponent>
            </div>

            {/* User */}
            <div className="flex justify-between">
                <div className="mt-2">
                    <Typography semibold>
                        <span className="text-[15px]">
                            {profile?.user?.name} {profile?.familyName || ''}
                        </span>
                    </Typography>

                    <AuthorizedUserComponent
                        roles={[
                            UserRoles.ADMIN,
                            UserRoles.RTO,
                            UserRoles.OBSERVER,
                        ]}
                    >
                        <HideRestrictedData type={UserRoles.STUDENT}>
                            <Typography variant="xs" color="text-[#6B7280]">
                                {process.env.NEXT_PUBLIC_NODE_ENV === 'local'
                                    ? profile?.user?.email
                                    : maskText(profile?.user?.email)}
                            </Typography>
                        </HideRestrictedData>
                    </AuthorizedUserComponent>
                </div>
                <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
                    <AssignToMeStudent student={profile} />
                </AuthorizedUserComponent>
            </div>

            {/* <AuthorizedUserComponent
                roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
            >
                <div
                    onClick={onViewProfileVisitorsClicked}
                    className="cursor-pointer text-[11px] py-2 px-1 text-info hover:bg-gray-200 w-fit ml-auto"
                >
                    View Visitors
                </div>
            </AuthorizedUserComponent> */}

            {/* Expiry Date */}
            <div className="flex items-center gap-x-5 mt-3">
                <StudentExpireTime
                    studentId={profile?.user?.id}
                    date={profile?.expiryDate}
                    oldExpiry={profile?.oldExpiry}
                />
            </div>

            {/* Profile Priority */}
            <ProfilePriority
                studentId={profile?.id}
                isHighPriority={profile?.isHighPriority}
                disabled={role === UserRoles.OBSERVER}
            />

            {/* Contact Status */}
            <ContactStatus
                studentId={profile?.id}
                nonContactable={profile?.nonContactable}
                disabled={role === UserRoles.OBSERVER}
            />

            {/*  */}
            <ProblamaticStudent
                studentId={profile?.id}
                hasIssue={profile?.hasIssue}
                disabled={role === UserRoles.OBSERVER}
                isReported={profile?.isReported}
            />

            {/* Student Detail */}
            <StudentDetail
                profile={profile}
                isHod={subadmin?.departmentMember?.isHod}
            />
            {/* <RtoDetail rto={profile?.rto} /> */}
            <EmergencyContact
                profile={profile}
                isHod={subadmin?.departmentMember?.isHod}
            />

            {/* Student Status */}
            <AuthorizedUserComponent excludeRoles={[UserRoles.OBSERVER]}>
                <StudentStatus
                    studentUserId={profile?.user?.id}
                    studentStatus={profile?.studentStatus}
                />
            </AuthorizedUserComponent>

            {/* RTO */}
        </div>
    )
}
