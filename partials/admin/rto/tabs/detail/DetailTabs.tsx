import { SectorsTab } from './SectorsTab'
import { SubAdminsTab } from './SubAdminsTab'
import { AssessmentTools } from './AssessmentTools'
import { TabNavigation, TabProps } from '@components'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
    AllCommunicationTab,
    NotesTab,
    MailsTab,
    AppointmentTab,
} from '@partials/common'
import { RTOReports } from '@partials/common/Reports'
import { RtoStudentsAssessmentGallery } from '@partials/common/RtoStudentsAssessmentGallery'
import { RtoAddDocuments } from '@partials/rto/components'
import { ContactPersons } from './ContactPersons'

export const DetailTabs = ({
    id,
    rto,
}: {
    rto: any
    id: number | string | string[] | undefined
}) => {
    const router = useRouter()
    const [isArchivedAssessment, setIsArchivedAssessment] =
        useState<boolean>(false)
    useEffect(() => {
        setIsArchivedAssessment(router.query.tab === 'archived' ? true : false)
    }, [router])

    const tabs: TabProps[] = [
        {
            label: 'Sectors',
            href: { query: { tab: 'sectors', id } },
            element: <SectorsTab rto={rto} />,
        },
        {
            label: 'Assessments',
            href: {
                query: {
                    tab: isArchivedAssessment ? 'archived' : 'assessments',
                    id,
                },
            },
            element: <AssessmentTools rto={rto} />,
        },
        {
            label: 'Sub Admins',
            href: { query: { tab: 'sub-admin', id } },
            element: <SubAdminsTab rto={rto} />,
        },
        {
            label: 'Contact Persons',
            href: { query: { tab: 'contact-person', id } },
            element: <ContactPersons rto={rto?.data} />,
        },
        {
            label: 'Appointments',
            href: { pathname: String(id), query: { tab: 'appointments' } },
            element: <AppointmentTab userId={rto?.data?.user?.id} />,
        },
        {
            label: 'Notes',
            href: { query: { tab: 'notes', id } },
            element: <NotesTab user={rto?.data?.user} />,
        },
        {
            label: 'Reports',
            href: { query: { tab: 'reports', id } },
            element: (
                <RTOReports
                    user={rto?.data?.user}
                    createdAt={rto?.data?.createdAt}
                />
            ),
        },
        {
            label: 'Documents',
            href: { query: { tab: 'documents', id } },
            element: <RtoAddDocuments rto={rto?.data} />,
        },
        {
            label: 'Gallery',
            href: { query: { tab: 'gallery', id } },
            element: <RtoStudentsAssessmentGallery />,
        },
        {
            label: 'Mails',
            href: { query: { tab: 'mails', id } },
            element: <MailsTab user={rto?.data?.user} />,
        },
        {
            label: 'All Communications',
            href: { query: { tab: 'all-communications', id } },
            element: <AllCommunicationTab user={rto?.data?.user} />,
        },
    ]

    return (
        <div>
            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => {
                    return (
                        <div>
                            <div>{header}</div>
                            <div className="p-4">{element}</div>
                        </div>
                    )
                }}
            </TabNavigation>
        </div>
    )
}
