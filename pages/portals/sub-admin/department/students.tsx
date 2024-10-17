import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import React, { ReactElement } from 'react'

import { BackButton, TabNavigation, TabProps } from '@components'
import { DepartmentPendingStudents, DepartmentStudentList } from '@partials/sub-admin'

// useDepartmentStudents
const DepartmentStudents: NextPageWithLayout = () => {
    const tabs: TabProps[] = [
        {
            label: 'Department Students',
            href: {
                pathname: 'students',
                query: { tab: 'all-students' },
            },

            element: <DepartmentStudentList />,
        },
        {
            label: 'Pending Students',
            href: {
                pathname: 'students',
                query: { tab: 'pending-students' },
            },

            element: <DepartmentPendingStudents />,
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
