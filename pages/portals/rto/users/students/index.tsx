import { ReactElement, useEffect } from 'react'
import Link from 'next/link'
//Layouts
import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { TabsView } from '@components/sections/rto'
//components
import {
    ReactTable,
    Typography,
    TabProps,
    TabNavigation,
    Button,
    PageTitle,
} from '@components'
import { FaEnvelope, FaPhoneSquareAlt } from 'react-icons/fa'
import Image from 'next/image'
import {
    ApprovedStudent,
    PendingStudent,
    RejectedStudent,
    BlockedStudent,
    ArchivedStudent,
} from '@partials/rto/student'
import { useContextBar } from '@hooks'
import { useRouter } from 'next/router'

type Props = {}

const RtoStudents: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    const contextBar = useContextBar()

    useEffect(() => {
        contextBar.show(false)
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: { pathname: 'students', query: { tab: 'pending' } },
            element: <PendingStudent />,
        },
        {
            label: 'Approved',
            href: { pathname: 'students', query: { tab: 'approved' } },
            element: <ApprovedStudent />,
        },
        {
            label: 'Rejected',
            href: { pathname: 'students', query: { tab: 'rejected' } },
            element: <RejectedStudent />,
        },
        {
            label: 'Blocked',
            href: { pathname: 'students', query: { tab: 'blocked' } },
            element: <BlockedStudent />,
        },
        {
            label: 'Archived',
            href: { pathname: 'students', query: { tab: 'archived' } },
            element: <ArchivedStudent />,
        },
    ]

    return (
        <>
            <div>
                <div className="flex items-end justify-between mb-6">
                    <PageTitle title="Students" backTitle="Users" />

                    <div>
                        <Button
                            onClick={() => {
                                router.push('students/import-students')
                            }}
                        >
                            Import Students
                        </Button>
                    </div>
                </div>

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
        </>
    )
}
RtoStudents.getLayout = (page: ReactElement) => {
    return <RtoLayout>{page}</RtoLayout>
}

export default RtoStudents
