import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

// components
import { BackButton, TabProps, TabNavigation } from '@components'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { CreateTask, EmployeeSchedule } from '@partials/industry'

const Schedule: NextPageWithLayout = () => {
    const tabs: TabProps[] = [
        {
            label: 'Employees',
            href: { pathname: 'schedule', query: { tab: 'employee-schedule' } },
            element: <EmployeeSchedule />,
        },
        {
            label: 'Create Task',
            href: {
                pathname: 'schedule',
                query: { tab: 'create-task' },
            },
            element: <CreateTask />,
        },
    ]

    return (
        <div>
            <BackButton
                link={'my-tasks/add-a-schedule'}
                text={'Back To Selection'}
            />

            {/* Links */}

            {/* Others */}
            <div className="w-full mt-8">
                <TabNavigation tabs={tabs}>
                    {({ header, element }: any) => {
                        return (
                            <div>
                                <div>{header}</div>
                                <div>{element}</div>
                            </div>
                        )
                    }}
                </TabNavigation>
            </div>
        </div>
    )
}

Schedule.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default Schedule
