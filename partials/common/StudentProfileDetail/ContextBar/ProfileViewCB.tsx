import { AuthorizedUserComponent, StudentAvatar, Typography } from '@components'
import { Student } from '@types'
import {
    AssignToMeStudent,
    Avatar,
    ContactStatus,
    EmergencyContact,
    ProfileLinks,
    ProfilePriority,
    RtoDetail,
    StudentDetail,
    StudentExpireTime,
    StudentStatus,
} from '../ContextBarComponents'
import { UserRoles } from '@constants'

export const ProfileViewCB = ({ profile }: { profile: Student }) => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    {/* <Avatar
                        avatar={profile?.user?.avatar}
                        name={profile?.user?.name}
                    /> */}
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
                            {' '}
                            {profile?.user?.name} {profile?.familyName}
                        </span>
                    </Typography>
                    <Typography variant="xs" color="text-[#6B7280]">
                        {profile?.user?.email}
                    </Typography>
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

            {/* Student Detail */}
            <StudentDetail profile={profile} />
            <RtoDetail rto={profile?.rto} />
            <EmergencyContact profile={profile} />

            {/* Student Status */}
            <StudentStatus
                studentUserId={profile?.user?.id}
                studentStatus={profile?.studentStatus}
            />

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

            {/* RTO */}
        </div>
    )
}
