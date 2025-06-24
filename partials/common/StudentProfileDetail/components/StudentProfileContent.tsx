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
    profile,
    role,
    subadmin,
    workplaceLength,
    getWorkplaceLength,
    getActiveBorder,
}) => {
    const isAdminRole = role === UserRoles.ADMIN || subadmin?.data?.isAdmin

    return (
        <div className="flex flex-col gap-y-5 mt-8 mb-20 px-0 lg:px-2">
            <RtoDetail
                studentId={profile?.id}
                isHod={subadmin?.data?.departmentMember?.isHod}
            />

            <WorkplaceNotesSection
                profile={profile}
                role={role}
                subadmin={subadmin}
                workplaceLength={workplaceLength}
                getWorkplaceLength={getWorkplaceLength}
                getActiveBorder={getActiveBorder}
                isAdminRole={isAdminRole}
            />

            <AssessmentSection
                profile={profile}
                getActiveBorder={getActiveBorder}
            />

            <CommunicationSection
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
