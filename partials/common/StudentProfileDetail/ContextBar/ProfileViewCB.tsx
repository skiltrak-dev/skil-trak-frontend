import {
    AuthorizedUserComponent,
    HideRestrictedData,
    StudentAvatar,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { Student } from '@types'
import {
    AssignToMeStudent,
    ContactStatus,
    EmergencyContact,
    ProblamaticStudent,
    ProfileLinks,
    ProfilePriority,
    RtoDetail,
    StudentDetail,
    StudentExpireTime,
    StudentStatus,
} from '../ContextBarComponents'

export const ProfileViewCB = ({ profile }: { profile: Student }) => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <StudentAvatar
                        name={profile?.user.name}
                        imageUrl={profile?.user?.avatar}
                        gender={profile?.gender}
                    />
                </div>
                <ProfileLinks profile={profile} />
            </div>

            {/* User */}
            <div className="flex justify-between">
                <div className="mt-2">
                    <Typography semibold>
                        <span className="text-[15px]">
                            {profile?.user?.name} {profile?.familyName}
                        </span>
                    </Typography>
                    <HideRestrictedData type={UserRoles.STUDENT}>
                        <Typography variant="xs" color="text-[#6B7280]">
                            {true ? '---' : profile?.user?.email}
                        </Typography>
                    </HideRestrictedData>
                </div>
                <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
                    <AssignToMeStudent student={profile} />
                </AuthorizedUserComponent>
            </div>

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
            />

            {/* Contact Status */}
            <ContactStatus
                studentId={profile?.id}
                nonContactable={profile?.nonContactable}
            />

            {/*  */}
            <ProblamaticStudent
                studentId={profile?.id}
                hasIssue={profile?.hasIssue}
            />

            {/* Student Detail */}
            <StudentDetail profile={profile} />
            <RtoDetail rto={profile?.rto} />
            <EmergencyContact profile={profile} />

            {/* Student Status */}
            <StudentStatus
                studentUserId={profile?.user?.id}
                studentStatus={profile?.studentStatus}
            />

            {/* RTO */}
        </div>
    )
}
