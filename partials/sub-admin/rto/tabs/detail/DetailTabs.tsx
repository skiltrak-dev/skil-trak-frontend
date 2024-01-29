import { TabNavigation, TabProps } from '@components'

import { FigureCard } from '@components/sections/subAdmin'
import {
    AllCommunicationTab,
    AppointmentTab,
    MailsTab,
    NotesTab,
} from '@partials/common'
import { SubAdminApi } from '@queries'
import { Rto, UserStatus } from '@types'
import { AssessmentToolsSubAdmin } from './AssessmentToolsSubAdmin'
import { RtoProfileOverview } from './RtoProfileOverview'
import { RTOReports } from '@partials/common/Reports'
import { RtoStudentsAssessmentGallery } from '@partials/common/RtoStudentsAssessmentGallery'
import { RtoAddDocuments } from '@partials/rto/components'
import { useState } from 'react'
export const DetailTabs = ({ rto }: { rto: Rto }) => {
    const [selectedNoteId, setSelectedNoteId] = useState<number>(0)
    const rtoStatsCount = SubAdminApi.Rto.useRtoStatsCount(
        Number(rto?.user?.id),
        { skip: !rto?.user?.id }
    )

    const onSetSelectedNoteId = (val: number) => {
        setSelectedNoteId(val)
    }

    const tabs: TabProps[] = [
        {
            label: 'Overview',
            href: { pathname: String(rto?.id), query: { tab: 'overview' } },
            badge: { text: '05', color: 'text-blue-500' },
            element: (
                <RtoProfileOverview
                    rtoDetail={rto}
                    rtoId={rto?.id}
                    userId={rto?.user?.id}
                />
            ),
        },
        {
            label: 'Assessments',
            href: {
                pathname: String(rto?.id),
                query: { tab: 'assessments' },
            },
            badge: { text: '', color: 'text-error-500' },
            element: <AssessmentToolsSubAdmin />,
        },
        {
            label: 'Appointments',
            href: { pathname: String(rto?.id), query: { tab: 'appointments' } },
            element: <AppointmentTab userId={rto?.user?.id} />,
        },
        {
            label: 'RTO Reports',
            href: { pathname: String(rto?.id), query: { tab: 'reports' } },
            element: (
                <RTOReports
                    user={rto?.user}
                    createdAt={rto?.createdAt as Date}
                />
            ),
        },
        {
            label: 'Gallery',
            href: { pathname: String(rto?.id), query: { tab: 'gallery' } },
            element: (
                <div className="mb-5">
                    <RtoStudentsAssessmentGallery />
                </div>
            ),
        },
        {
            label: 'Documents',
            href: { pathname: String(rto?.id), query: { tab: 'documents' } },
            element: <RtoAddDocuments rto={rto} />,
        },
        {
            label: 'Mails',
            href: { pathname: String(rto?.id), query: { tab: 'mails' } },
            element: <MailsTab user={rto?.user} />,
        },
        {
            label: 'Notes',
            href: { pathname: String(rto?.id), query: { tab: 'notes' } },
            element: <NotesTab user={rto?.user} />,
        },
        {
            label: 'All Communications',
            href: {
                pathname: String(rto?.id),
                query: { tab: 'all-communications' },
            },
            element: <AllCommunicationTab user={rto?.user} />,
        },
    ]

    return (
        <div>
            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => {
                    return (
                        <div>
                            <div className="flex gap-x-4">
                                <FigureCard
                                    imageUrl="/images/icons/students.png"
                                    count={Number(
                                        rtoStatsCount?.data?.currentStudent
                                    )}
                                    title={'Current Students'}
                                    link={`/portals/sub-admin/students?tab=all&rtoId=${rto?.id}&status=${UserStatus.Approved}`}
                                />
                                <FigureCard
                                    imageUrl="/images/icons/pending-student.png"
                                    count={Number(
                                        rtoStatsCount?.data?.pendingStudent
                                    )}
                                    title={'Pending Students'}
                                    link={`/portals/sub-admin/students?tab=all&rtoId=${rto?.id}&status=${UserStatus.Pending}`}
                                />
                                <FigureCard
                                    imageUrl="/images/icons/industry.png"
                                    count={Number(
                                        rtoStatsCount?.data?.workplaceRequest
                                    )}
                                    title={'Workplace Requests'}
                                    link={`/portals/sub-admin/tasks/workplace?tab=all&rtoId=${rto?.id}`}
                                />
                                <FigureCard
                                    imageUrl="/images/icons/job.png"
                                    count={Number(
                                        rtoStatsCount?.data?.pendingResult
                                    )}
                                    title={'Pending Result'}
                                    link={`/portals/sub-admin/tasks/assessment-evidence?tab=pending&rtoId=${rto?.id}&result=pending`}
                                />
                            </div>
                            <div>{header}</div>
                            <div>{element}</div>
                        </div>
                    )
                }}
            </TabNavigation>
        </div>
    )
}
