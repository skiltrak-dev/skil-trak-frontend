import { ReactElement } from 'react'

import { TabNavigation, TabProps } from '@components'
import { AdminLayout } from '@layouts'
import { Countries, States } from '@partials/admin/countries'
import { NextPageWithLayout } from '@types'

const CountriesList: NextPageWithLayout = () => {
    const tabs: TabProps[] = [
        {
            label: 'Countries',
            href: {
                pathname: 'countries',
                query: { tab: 'countries', page: 1, pageSize: 50 },
            },
            element: <Countries />,
        },
        {
            label: 'States',
            href: {
                pathname: 'countries',
                query: { tab: 'states', page: 1, pageSize: 50 },
            },
            element: <States />,
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

CountriesList.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default CountriesList
