import { ReactElement, useEffect } from 'react'

import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { Card, TabNavigation, TabProps } from '@components'

// query
import { AdminApi } from '@queries'

// components
import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { useNavbar } from '@hooks'
import { AdminWorkplaceRequest } from '@partials/admin/workplace/components/AdminWorkplaceRequest'
import {
    AllRequestedWorkplace,
    AllStudentProvidedWorkplace,
    AssignedRequest,
    UnAssignedRequest,
} from '@partials'

type Props = {}

const Workplace: NextPageWithLayout = (props: Props) => {
    const navBar = useNavbar()

    useEffect(() => {
        navBar.setTitle('Workplace Request')
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'All Student Provided Workplace',
            href: {
                pathname: 'workplaces',
                query: { tab: 'all-student-provided-workplace' },
            },
            element: <AllStudentProvidedWorkplace />,
        },
        {
            label: 'All Requested Workplace',
            href: {
                pathname: 'workplaces',
                query: { tab: 'all-requested-workplace' },
            },
            element: <AllRequestedWorkplace />,
        },
        {
            label: 'Assigned Request',
            href: {
                pathname: 'workplaces',
                query: { tab: 'assigned-request' },
            },
            element: <AssignedRequest />,
        },
        {
            label: 'Un Assigned Request',
            href: {
                pathname: 'workplaces',
                query: { tab: 'un-assigned-request' },
            },
            element: <UnAssignedRequest />,
        },
    ]

    return (
        <>
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
        </>
    )
}
Workplace.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Workplace
