import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { TabNavigation, TabProps } from '@components/TabNavigation'
import { PendingStudents, Approved } from '@partials/industry'

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
            element: <PendingStudents />,
        },
        {
            label: 'Approved',
            href: { pathname: 'current-students', query: { tab: 'approved' } },
            element: <Approved />,
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
    return <IndustryLayout>{page}</IndustryLayout>
}

export default CurrentStudents
