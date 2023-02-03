import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { TabProps } from '@components/TabNavigation'
import { PendingStudents } from '@partials/industry'

const CurrentStudents: NextPageWithLayout = () => {
    const router = useRouter()
    const { query } = router

    useEffect(() => {
        if (!Object.keys(query).length) {
            router.push('./current-students?tab=pending')
        }
    }, [query])

    // const tabs: TabProps[] = [
    //     {
    //         label: 'Pending',
    //         href: { pathname: 'current-students', query: { tab: 'pending' } },
    //         element: <PendingStudents />,
    //     },
    // {
    //     label: 'Interview',
    //     href: { pathname: 'current-students', query: { tab: 'approved' } },
    //     element: <Interview />,
    // },
    // {
    //     label: 'Approved',
    //     href: { pathname: 'current-students', query: { tab: 'rejected' } },
    //     element: <Approved />,
    // },
    // {
    //     label: 'Rejected',
    //     href: { pathname: 'current-students', query: { tab: 'blocked' } },
    //     element: <Rejected />,
    // },
    // {
    //     label: 'Cancelled',
    //     href: { pathname: 'current-students', query: { tab: 'cancelled' } },
    //     element: <Cancelled />,
    // },
    // {
    //     label: 'Terminated',
    //     href: {
    //         pathname: 'current-students',
    //         query: { tab: 'terminated' },
    //     },
    //     element: <Terminated />,
    // },
    // {
    //     label: 'Completed',
    //     href: { pathname: 'current-students', query: { tab: 'completed' } },
    //     element: <Completed />,
    // },
    // ]
    return (
        <div>
            <PendingStudents />
            {/* <TabNavigation tabs={tabs}>
                {({ header, element }: any) => {
                    return (
                        <div>
                            <div>{header}</div>
                            <div className="mt-3">{element}</div>
                        </div>
                    )
                }}
            </TabNavigation> */}
        </div>
    )
}

CurrentStudents.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default CurrentStudents
