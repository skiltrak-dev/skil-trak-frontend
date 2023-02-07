import { ReactElement, useEffect } from 'react'

import { TabNavigation, TabProps } from '@components'
import { useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { Courses, Sectors } from '@partials/admin/sector'
import { NextPageWithLayout } from '@types'

const SectorList: NextPageWithLayout = () => {
    const tabs: TabProps[] = [
        {
            label: 'Sectors',
            href: { pathname: 'sectors', query: { tab: 'sectors' } },
            element: <Sectors />,
        },
        {
            label: 'Courses',
            href: { pathname: 'sectors', query: { tab: 'courses' } },
            element: <Courses />,
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

SectorList.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default SectorList
