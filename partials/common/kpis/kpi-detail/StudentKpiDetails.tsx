'use client'
import { useState } from 'react'
import { CircularProgress } from '../Common/CircularProgress'
import {
    AppointmentTable,
    CallIndustriesTable,
    CallStudents,
    Completed,
    FlagStudents,
    SnoozedStudents,
    StudentAgreementTable,
    WorkplaceAgreementTable,
    WorkplaceRequest,
} from './ProgressTable'

import { AuthorizedUserComponent, InitialAvatar, Typography } from '@components'
import { UserRoles } from '@constants'
import { UserStatus } from '@types'
import { Moment } from 'moment'
import { WeekFilter } from '../Common'
import { VerifyAction } from '../HOD'

const SECTIONS_CONFIG = [
    {
        label: 'General',
        components: [
            { component: AppointmentTable, key: 'appointment' },
            { component: WorkplaceRequest, key: 'workplace-request' },
            { component: Completed, key: 'completed' },
            { component: StudentAgreementTable, key: 'student-agreement' },
            { component: WorkplaceAgreementTable, key: 'workplace-agreement' },
        ],
    },
    {
        label: 'Call industries',
        components: [
            { component: CallIndustriesTable, key: 'call-industries' },
        ],
    },
    {
        label: 'call Student',
        components: [{ component: CallStudents, key: 'call-students' }],
    },
    {
        label: 'Snoozed',
        components: [{ component: SnoozedStudents, key: 'snoozed' }],
    },
    {
        label: 'Flaged',
        components: [{ component: FlagStudents, key: 'flagedTable' }],
    },
]

export const StudentKpiDetails = ({ subadmin }: { subadmin: any }) => {
    const [activeSection, setActiveSection] = useState(SECTIONS_CONFIG[0].label)
    const [startDate, setStartDate] = useState<Moment | null>(null)
    const [endDate, setEndDate] = useState<Moment | null>(null)

    const handleDatesChange = (startDate: Moment, endDate: Moment) => {
        setStartDate(startDate)
        setEndDate(endDate)
    }

    const activeSectionConfig = SECTIONS_CONFIG.find(
        (section) => section.label === activeSection
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
                        <div className="flex items-center gap-2 ">
                            <CircularProgress
                                value={Math.round(Number(subadmin?.overAll))}
                            />
                            <Typography variant="label">Efficiency</Typography>
                        </div>
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
