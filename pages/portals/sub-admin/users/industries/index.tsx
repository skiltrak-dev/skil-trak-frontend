import { ReactElement, useEffect, useState } from 'react'
import Link from 'next/link'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { TabsView } from '@components/sections/rto'
//components
import {
    Button,
    ReactTable,
    RtoContextBarData,
    SidebarCalendar,
    Typography,
    TableAction,
    TableActionOption,
    Card,
    LoadingAnimation,
    EmptyData,
    TechnicalError,
    Table,
    TabNavigation,
    TabProps,
} from '@components'
// queries
import { useGetSubAdminIndustriesQuery } from '@queries'
import { FaEnvelope, FaEye, FaPhoneSquareAlt } from 'react-icons/fa'
import Image from 'next/image'
import { useContextBar } from '@hooks'

import { Industry } from '@types'
import { useRouter } from 'next/router'

import { AdminApi } from '@queries'
import {
    AllIndustries,
    FavoriteIndustries,
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
    return <SubAdminLayout title="Industries">{page}</SubAdminLayout>
}

export default Industries
