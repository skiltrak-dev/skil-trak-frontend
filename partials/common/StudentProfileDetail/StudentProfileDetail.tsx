import React from 'react'
import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { StudentProfileContent, StudentProfileHeader } from './components'
import {
    useContextBarSetup,
    useProfileNavigation,
    useStudentAlerts,
    useStudentProfile,
    useWorkplaceData,
} from './hooks'
import { useSubadminProfile } from '@hooks'
import { WorkplaceHookProvider } from './components/Workplace/hooks'

export const StudentProfileDetail = () => {
    // Main profile data and router logic
    const {
        profile,
        studentId,
        role,
        router,
        contextBar,
        alertMessage,
        setAlerts,
        alerts,
    } = useStudentProfile()

    // Sub-admin specific data
    const subadmin = useSubadminProfile()

    // Navigation and section highlighting
    const {
        selectedId,
        setSelectedId,
        quickSearch,
        setQuickSearch,
        handleScroll,
        handleSectionClick,
        getActiveBorder,
    } = useProfileNavigation(router, profile)

    // Context bar setup and mouse tracking
    useContextBarSetup(contextBar, profile, router, subadmin)

    // Student status alerts
    useStudentAlerts(profile, alertMessage, setAlerts)

    // Workplace data management
    const { workplaceLength, getWorkplaceLength } = useWorkplaceData()

    // Loading and error states
    if (profile.isError) {
        return <TechnicalError />
    }

    if (profile.isLoading) {
        return <LoadingAnimation />
    }

    if (!profile?.data && profile?.isSuccess) {
        return (
            <EmptyData
                title="No Student Detail"
                description="No Student Detail were found"
            />
        )
    }

    return (
        <div>
            <StudentProfileHeader
                profile={profile}
                role={role}
                subadmin={subadmin}
                router={router}
                quickSearch={quickSearch}
                setQuickSearch={setQuickSearch}
                onSectionClick={handleSectionClick}
            />

            {profile?.data && profile?.isSuccess && (
                <WorkplaceHookProvider student={profile.data}>
                    <StudentProfileContent
                        profile={profile.data}
                        role={role}
                        subadmin={subadmin}
                        workplaceLength={workplaceLength}
                        getWorkplaceLength={getWorkplaceLength}
                        getActiveBorder={getActiveBorder}
                    />
                </WorkplaceHookProvider>
            )}
        </div>
    )
}
