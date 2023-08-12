import { TabNavigation, TabProps } from '@components'
import {
    AllCommunicationTab,
    AppointmentTab,
    BranchesIndustries,
    MailsTab,
    NotesTab,
    Supervisor,
} from '@partials/common'
import { SectorsTab } from './SectorsTab'
import { Students } from './Students'
import { useEffect, useState } from 'react'
import { IndustryHistory } from './IndustryHistory'

export const DetailTabs = ({
    id,
    industry,
}: {
    id?: number | string | string[] | undefined
    industry: any
}) => {
    const [tabs, setTabs] = useState<TabProps[]>([
        {
            label: 'Sectors',
            href: { query: { tab: 'sectors', id } },
            element: <SectorsTab industry={industry} />,
        },
        {
            label: 'History',
            href: { query: { tab: 'history', id } },
            element: <IndustryHistory industry={industry?.data?.user?.id} />,
        },
        {
            label: 'Supervisors',
            href: { query: { tab: 'supervisors', id } },
            element: <Supervisor industry={industry?.data} />,
        },

        {
            label: 'Students',
            href: { query: { tab: 'students', id } },
            element: <Students industry={industry?.data} />,
        },
        {
            label: 'Appointments',
            href: { pathname: String(id), query: { tab: 'appointments' } },
            element: <AppointmentTab userId={industry?.data?.user?.id} />,
        },
        {
            label: 'Notes',
            href: { query: { tab: 'notes', id } },
            element: <NotesTab user={industry?.data?.user} />,
        },
        {
            label: 'Mails',
            href: { query: { tab: 'mails', id } },
            element: <MailsTab user={industry?.data?.user} />,
        },
        {
            label: 'All Communications',
            href: { query: { tab: 'all-communications', id } },
            element: <AllCommunicationTab user={industry?.data?.user} />,
        },
    ])

    // useEffect(() => {
    //     if (industry?.data?.branches && industry?.data?.branches?.length > 0) {
    //         let industryTabs = [...tabs]
    //         industryTabs?.splice(4, 0, {
    //             label: 'Branches',
    //             href: { query: { tab: 'branches', id } },
    //             element: (
    //                 <BranchesIndustries
    //                     industry={industry?.data}
    //                     industries={industry?.data?.branches}
    //                 />
    //             ),
    //         })
    //         const filteredIndustryTabs = tabs?.some(
    //             (tab) => tab?.label === 'Branches'
    //         )
    //         !filteredIndustryTabs && setTabs(industryTabs)
    //     }
    // }, [industry])

    const Branches = {
        label: 'Branches',
        href: { query: { tab: 'branches', id } },
        element: (
            <BranchesIndustries
                industry={industry?.data}
                industries={industry?.data?.branches}
            />
        ),
    }

    return (
        <div>
            <TabNavigation tabs={[...tabs, Branches]}>
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
