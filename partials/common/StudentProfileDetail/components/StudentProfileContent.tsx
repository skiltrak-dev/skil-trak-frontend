import { UserRoles } from '@constants'
import React from 'react'
import { RtoDetail } from './RtoDetail'
import {
    AppointmentsTicketsSection,
    AssessmentSection,
    CommunicationSection,
    ScheduleSection,
    WorkplaceNotesSection,
} from './ProfileContent'
import { ProfileIds, StudentProfileData } from '../types'
import { Student } from '@types'

interface ProfileContentProps {
    profile: Student
    role: string
    subadmin: any
    workplaceLength: number
    getWorkplaceLength: (length: number) => void
    getActiveBorder: (key: ProfileIds) => string
}

export const StudentProfileContent: React.FC<ProfileContentProps> = ({
    role,
    profile,
    subadmin,
    getActiveBorder,
    workplaceLength,
    getWorkplaceLength,
}) => {
    const isAdminRole = role === UserRoles.ADMIN || subadmin?.data?.isAdmin

    return (
        <div className="flex flex-col gap-y-5 mt-8 mb-20 px-0 lg:px-2">
            <RtoDetail
                studentId={profile?.id}
                isHod={subadmin?.data?.departmentMember?.isHod}
            />

            <WorkplaceNotesSection
                role={role}
                profile={profile}
                subadmin={subadmin}
                isAdminRole={isAdminRole}
                workplaceLength={workplaceLength}
                getActiveBorder={getActiveBorder}
                getWorkplaceLength={getWorkplaceLength}
            />

            <CommunicationSection
                profile={profile}
                getActiveBorder={getActiveBorder}
            />

            <AssessmentSection
                profile={profile}
                getActiveBorder={getActiveBorder}
            />

            <AppointmentsTicketsSection
                profile={profile}
                role={role}
                subadmin={subadmin}
                getActiveBorder={getActiveBorder}
            />

            <ScheduleSection
                profile={profile}
                getActiveBorder={getActiveBorder}
            />
        </div>
    )
}
