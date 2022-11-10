import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { CurrentStudnts } from '@components/sections'
import { TabNavigation, TabProps } from '@components/TabNavigation'

const CurrentStudents: NextPageWithLayout = () => {
    const router = useRouter()
    const { query } = router

    useEffect(() => {
        if (!Object.keys(query).length) {
            router.push('./current-students?tab=pending')
        }
    }, [query])

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: { pathname: 'current-students', query: { tab: 'pending' } },
            element: <CurrentStudnts />,
        },
        {
            label: 'Interview',
            href: { pathname: 'current-students', query: { tab: 'approved' } },
            element: <div>Approved RTOs</div>,
        },
        {
            label: 'Approved',
            href: { pathname: 'current-students', query: { tab: 'rejected' } },
            element: <div>Rejected RTOs</div>,
        },
        {
            label: 'Rejected',
            href: { pathname: 'current-students', query: { tab: 'blocked' } },
            element: <div>Blocked RTOs</div>,
        },
        {
            label: 'Cancelled',
            href: { pathname: 'current-students', query: { tab: 'cancelled' } },
            element: <div>Archived RTOs</div>,
        },
        {
            label: 'Terminated',
            href: {
                pathname: 'current-students',
                query: { tab: 'terminated' },
            },
            element: <div>Archived RTOs</div>,
        },
        {
            label: 'Completed',
            href: { pathname: 'current-students', query: { tab: 'completed' } },
            element: <div>Archived RTOs</div>,
        },
    ]
    return (
        <div>
            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => {
                    return (
                        <div>
                            <div>{header}</div>
                            <div className="mt-3">{element}</div>
                        </div>
                    )
                }}
            </TabNavigation>
        </div>
    )
}

CurrentStudents.getLayout = (page: ReactElement) => {
    return <StudentLayout>{page}</StudentLayout>
}

export default CurrentStudents
