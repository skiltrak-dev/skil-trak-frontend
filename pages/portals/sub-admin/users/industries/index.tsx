import { ReactElement, useEffect } from 'react'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

//components
import {
    Button, RtoContextBarData,
    SidebarCalendar, TabNavigation,
    TabProps
} from '@components'
// queries
import { useContextBar } from '@hooks'


import {
    AllIndustries,
    FavoriteIndustries
} from '@partials/sub-admin/indestries'

type Props = {}

const Industries: NextPageWithLayout = (props: Props) => {
    const { setContent } = useContextBar()

    useEffect(() => {
        setContent(
            <>
                <Button variant={'dark'} text={'My Schedule'} />
                <SidebarCalendar />
                <RtoContextBarData />
            </>
        )
    }, [setContent])

    const tabs: TabProps[] = [
        {
            label: 'All',
            href: { pathname: 'industries', query: { tab: 'all' } },
            element: <AllIndustries />,
        },
        {
            label: 'Favourite Industries',
            href: { pathname: 'industries', query: { tab: 'favorite' } },
            element: <FavoriteIndustries />,
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
Industries.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Industries' }}>
            {page}
        </SubAdminLayout>
    )
}

export default Industries
