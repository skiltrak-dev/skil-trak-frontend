import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import React, { ReactElement } from 'react'

import { BackButton, TabNavigation, TabProps } from '@components'
import {
    DepartmentPendingStudents,
    DepartmentStudentList,
    FlaggedDepartmentStudentList,
    NonContactableDepartmentStudentList,
    SnoozedDepartmentStudentList,
} from '@partials/sub-admin'
import { SubAdminApi } from '@queries'

// useDepartmentStudents
const DepartmentStudents: NextPageWithLayout = () => {
    const { data, isLoading, isError } =
        SubAdminApi.SubAdmin.useDepartmentStudentsCount()

    const tabs: TabProps[] = [
        {
            label: 'Pending Students',
            href: {
                pathname: 'students',
                query: { tab: 'pending-students' },
            },
            badge: {
                text: data?.pendingStudents,
                loading: isLoading,
            },

            element: <DepartmentPendingStudents />,
        },
        {
            label: 'Department Students',
            href: {
                pathname: 'students',
                query: { tab: 'all-students' },
            },
            badge: {
                text: data?.allStudents,
                loading: isLoading,
            },

            element: <DepartmentStudentList />,
        },
        {
            label: 'Snoozed Students',
            href: {
                pathname: 'students',
                query: { tab: 'snoozed-students' },
            },
            badge: {
                text: data?.snoozedStudents,
                loading: isLoading,
            },

            element: <SnoozedDepartmentStudentList />,
        },
        {
            label: 'Flagged Students',
            href: {
                pathname: 'students',
                query: { tab: 'flagged-students' },
            },
            badge: {
                text: data?.flaggedStudents,
                loading: isLoading,
            },

            element: <FlaggedDepartmentStudentList />,
        },
        {
            label: 'Non-Contactable Students',
            href: {
                pathname: 'students',
                query: { tab: 'non-contactable-students' },
            },
            badge: {
                text: data?.notContactableStudents,
                loading: isLoading,
            },

            element: <NonContactableDepartmentStudentList />,
        },
    ]

    return (
        <div className="px-4">
            <BackButton text={'Go Back'} />
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

DepartmentStudents.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default DepartmentStudents
