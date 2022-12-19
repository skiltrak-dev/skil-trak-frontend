import { MailsTab } from './MailsTab'
import { NotesTab } from './NotesTab'
import { SectorsTab } from './SectorsTab'
import { SubAdminsTab } from './SubAdminsTab'
import { AssessmentTools } from './AssessmentTools'
import { TabNavigation, TabProps } from '@components'
import { AllCommunicationTab } from './AllCommunicationTab'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export const DetailTabs = ({
    id,
    rto,
}: {
    id: number | string | string[] | undefined
    rto: any
}) => {
    const router = useRouter()
    const [isArchivedAssessment, setIsArchivedAssessment] =
        useState<boolean>(false)
    console.log('router', router.query.tab)
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
            label: 'Notes',
            href: { query: { tab: 'notes', id } },
            element: <NotesTab rto={rto?.data?.user} />,
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
            label: 'Mails',
            href: { query: { tab: 'mails', id } },
            element: <MailsTab rto={rto?.data?.user} />,
        },
        {
            label: 'All Communications',
            href: { query: { tab: 'all-communications', id } },
            element: <AllCommunicationTab rto={rto?.data} />,
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
