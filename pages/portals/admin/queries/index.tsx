import { TabNavigation, TabProps } from '@components'

import { CommonApi } from '@queries'
import { ReactElement, useEffect } from 'react'

// hooks
import { AdminLayout } from '@layouts'
import {
    BookADemoQuery,
    ContactUsQuery,
    TraineeshipProgramQuery,
    WorkBasedQuery,
} from '@partials'
import { useNavbar } from '@hooks'

const TraineeshipProgram = () => {
    const traineeShipCount = CommonApi.Traineeship.useCount()
    const workBasedCount = CommonApi.WorkBased.useCount()
    const contactUsQueriesCount = CommonApi.WorkBased.useContactUsQueriesCount()

    // useContactUsQueriesCount

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
        {
            label: 'Contact Us',
            href: {
                pathname: 'queries',
                query: { tab: 'contact-us' },
            },
            badge: {
                text: contactUsQueriesCount?.data,
                loading: contactUsQueriesCount?.isLoading,
            },
            element: <ContactUsQuery />,
        },
        {
            label: 'Book A Demo',
            href: {
                pathname: 'queries',
                query: { tab: 'book-a-demo' },
            },
            badge: {
                text: contactUsQueriesCount?.data,
                loading: contactUsQueriesCount?.isLoading,
            },
            element: <BookADemoQuery />,
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
