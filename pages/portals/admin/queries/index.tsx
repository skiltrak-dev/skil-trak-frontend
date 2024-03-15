import { TabNavigation, TabProps } from '@components'

import { CommonApi } from '@queries'
import { ReactElement, useEffect } from 'react'

// hooks
import { AdminLayout } from '@layouts'
import { TraineeshipProgramQuery, WorkBasedQuery } from '@partials'
import { useNavbar } from '@hooks'

const TraineeshipProgram = () => {
    const traineeShipCount = CommonApi.Traineeship.useCount()
    const workBasedCount = CommonApi.WorkBased.useCount()

    const { setTitle } = useNavbar()

    useEffect(() => {
        setTitle('Queries')
    }, [])

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
