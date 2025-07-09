import {
    AuthorizedUserComponent,
    HideRestrictedData,
    StudentAvatar,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { useMaskText } from '@hooks'
import { Student } from '@types'
import { getUserCredentials } from '@utils'
import { WPInvoiceStatus } from '../components'
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
import { IndustryRequestsActions } from '@partials/sub-admin/ManagerApprovalList/enum'

export const ProfileViewCB = ({ profile }: { profile: Student }) => {
    const role = getUserCredentials()?.role

    return (
        <div>
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
                    <div className="flex items-center gap-x-2">
                        <Typography semibold>
                            <span className="text-[15px]">
                                {profile?.user?.name}{' '}
                                {profile?.familyName || ''}
                            </span>
                        </Typography>
                    </div>
                </div>
            </div>

            <div className="flex justify-between">
                <AuthorizedUserComponent
                    roles={[UserRoles.ADMIN, UserRoles.RTO, UserRoles.SUBADMIN]}
                >
                    <HideRestrictedData type={UserRoles.STUDENT}>
                        <Typography variant="xs" color="text-[#6B7280]">
                            {process.env.NEXT_PUBLIC_NODE_ENV === 'local'
                                ? profile?.user?.email
                                : useMaskText({
                                      key: profile?.user?.email,
                                  })}
                        </Typography>
                    </HideRestrictedData>
                </AuthorizedUserComponent>
                <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
                    <AssignToMeStudent student={profile} />
                </AuthorizedUserComponent>
            </div>
            <div className="">
                {profile?.rtoInfo && (
                    <div className="flex items-center gap-x-2 my-2">
                        <Typography variant="small" semibold>
                            RTO Info:
                        </Typography>
                        <Typography variant="small">
                            {profile?.rtoInfo}
                        </Typography>
                    </div>
                )}
                {profile?.courseDescription && (
                    <div className="flex items-center gap-x-2 my-2">
                        <Typography variant="small" semibold>
                            Course Info:
                        </Typography>
                        <Typography variant="small">
                            {profile?.courseDescription}
                        </Typography>
                    </div>
                )}
            </div>
            <WPInvoiceStatus />

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
                studentUpdateRequest={profile?.studentUpdateRequests?.find(
                    (r) => r?.action === IndustryRequestsActions.NonContactable
                )}
                nonContactableAt={profile?.nonContactableAt}
            />

            <ProblamaticStudent
                studentId={profile?.id}
                hasIssue={profile?.hasIssue}
                disabled={role === UserRoles.OBSERVER}
                isReported={profile?.isReported}
                studentUpdateRequest={profile?.studentUpdateRequests?.find(
                    (r) => r?.action === IndustryRequestsActions.Flagged
                )}
                studentUnFlaggedRequest={profile?.studentUpdateRequests?.find(
                    (r) => r?.action === IndustryRequestsActions.UnFlagged
                )}
            />

            <StudentDetail profile={profile} />
            <EmergencyContact profile={profile} />

            {/* Student Status */}
            <AuthorizedUserComponent excludeRoles={[UserRoles.OBSERVER]}>
                <StudentStatus
                    studentUserId={profile?.user?.id}
                    studentStatus={profile?.studentStatus}
                />
            </AuthorizedUserComponent>
        </div>
    )
}
