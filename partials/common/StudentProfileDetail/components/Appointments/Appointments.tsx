import { Button, Card, TabProps, Typography } from '@components'
import React from 'react'
import { Tabs } from '../Tabs'
import {
    CancelledAppointments,
    PastAppointments,
    UpcomingAppointments,
} from './components'
import { User } from '@types'
import { useRouter } from 'next/router'

export const Appointments = ({ user }: { user: User }) => {
    const router = useRouter()
    const tabs: TabProps[] = [
        {
            label: 'Upcoming',
            href: {
                pathname: `/portals/sub-admin/students/${router?.query?.id}/detail`,
                query: { tab: 'upcoming' },
            },

            element: <UpcomingAppointments />,
        },
        {
            label: 'Past',

            href: {
                pathname: `/portals/sub-admin/students/${router?.query?.id}/detail`,
                query: { tab: 'past' },
            },
            element: <PastAppointments />,
        },
        {
            label: 'Cancelled',
            href: {
                pathname: `/portals/sub-admin/students/${router?.query?.id}/detail`,
                query: { tab: 'cancelled' },
            },
            element: <CancelledAppointments />,
        },
    ]
    return (
        <Card noPadding>
            <div className="px-4 py-3.5 flex justify-between items-center border-b border-secondary-dark">
                <Typography variant="label" semibold>
                    Appointments
                </Typography>
                <Button>Book Appointment</Button>
            </div>
            <Tabs tabs={tabs} defaultTabSelected={0}>
                {({ header, element }: any) => {
                    return (
                        <div>
                            <div className="border-b border-secondary-dark py-1">
                                {header}
                            </div>
                            <div className="p-4">{element}</div>
                        </div>
                    )
                }}
            </Tabs>
        </Card>
    )
}
