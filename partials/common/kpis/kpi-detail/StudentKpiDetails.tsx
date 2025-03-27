'use client'
import { useMemo } from 'react'

import { AuthorizedUserComponent, InitialAvatar, Typography } from '@components'
import { UserRoles } from '@constants'
import { UserStatus } from '@types'
import { useRouter } from 'next/router'
import { VerifyAction } from '../HOD'
import { SECTIONS_CONFIG } from './kpiComponentsData'
import { SubadminDetailProgress } from './SubadminDetailProgress'
import { WeekFilter } from '../Common'

export const StudentKpiDetails = ({
    endDate,
    subadmin,
    startDate,
    activeSection,
    setActiveSection,
    handleDatesChange,
}: {
    activeSection: string
    setActiveSection: (val: string) => void
    endDate: any
    startDate: any
    subadmin: any
    handleDatesChange: any
}) => {
    const router = useRouter()

    const activeSectionConfig = useMemo(
        () =>
            SECTIONS_CONFIG.find((section) => section.label === activeSection),
        [activeSection]
    )

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-4 md:p-6">
                <div className="flex flex-col border rounded-lg border-[#EDEDED] p-4 md:p-6">
                    <div className="grid grid-cols-3 ">
                        <div className="flex items-center gap-3">
                            <InitialAvatar
                                name={subadmin?.name}
                                imageUrl={subadmin?.avatar}
                                large
                            />
                            <Typography variant="h4">
                                {subadmin?.name}
                            </Typography>
                        </div>

                        <div></div>

                        <SubadminDetailProgress
                            endDate={endDate}
                            startDate={startDate}
                        />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                        <div>
                            <Typography variant="label" color={'text-gray-600'}>
                                Position
                            </Typography>
                            <Typography medium>
                                {subadmin?.isHod ? 'Hod' : 'Coordinator'}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="label" color={'text-gray-600'}>
                                Department
                            </Typography>
                            <Typography medium>
                                {subadmin?.department}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="label" color={'text-gray-600'}>
                                Employment Status
                            </Typography>

                            <Typography medium capitalize>
                                {subadmin?.status === UserStatus.Approved
                                    ? 'Active'
                                    : subadmin?.status}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className="mt-4 bg-[#EDEDED] rounded-lg overflow-x-auto">
                    <nav className="flex flex-nowrap gap-1 p-1 min-w-max">
                        {SECTIONS_CONFIG.map((section) => (
                            <button
                                key={section.label}
                                onClick={() => setActiveSection(section.label)}
                                className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap
                  ${
                      activeSection === section.label
                          ? 'bg-white rounded-lg border border-[#1436B033] text-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                  }`}
                            >
                                {section.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <WeekFilter handleDatesChange={handleDatesChange} />

                <div className="mt-4 space-y-4">
                    {activeSectionConfig && (
                        <div className="space-y-4">
                            {activeSectionConfig.components.map(
                                ({ component: Component, key }) => (
                                    <Component
                                        key={key}
                                        {...{ startDate, endDate }}
                                    />
                                )
                            )}

                            <AuthorizedUserComponent
                                roles={[UserRoles.SUBADMIN]}
                            >
                                <VerifyAction subadmin={subadmin} />
                            </AuthorizedUserComponent>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
