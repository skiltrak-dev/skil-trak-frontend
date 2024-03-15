import {
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    TabNavigation,
    TabProps,
    Table,
    TableChildrenProps,
    TechnicalError,
    TruncatedTextWithTooltip,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEye, FaPhone } from 'react-icons/fa'

import { CommonApi } from '@queries'
import { isBrowser, setLink } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { MdEmail } from 'react-icons/md'

// hooks
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary'
import { useActionModal } from '@hooks'
import { AdminLayout } from '@layouts'
import { TraineeshipProgramQuery, WorkBasedQuery } from '@partials'

const TraineeshipProgram = () => {
    const traineeShipCount = CommonApi.Traineeship.useCount()
    const workBasedCount = CommonApi.WorkBased.useCount()

    const tabs: TabProps[] = [
        {
            label: 'Traineeship Program',
            href: {
                pathname: 'queries',
                query: { tab: 'traineeship' },
            },
            badge: {
                text: traineeShipCount?.data,
                loading: traineeShipCount?.isLoading,
            },
            element: <TraineeshipProgramQuery />,
        },
        {
            label: 'Work Based Query',
            href: {
                pathname: 'queries',
                query: { tab: 'work-base' },
            },
            badge: {
                text: workBasedCount?.data,
                loading: workBasedCount?.isLoading,
            },
            element: <WorkBasedQuery />,
        },
    ]

    return (
        <>
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
        </>
    )
}

TraineeshipProgram.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default TraineeshipProgram
