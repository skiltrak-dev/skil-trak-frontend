import { ReactElement, useEffect } from 'react'
// Layouts
import { AdminLayout } from '@layouts'
// Types
import { useNavbar } from '@hooks'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { BackButton, Button, Card, Typography } from '@components'
import { BsDot } from 'react-icons/bs'
import { TicketUser } from '@partials/admin/Tickets/components'

const Tickets: NextPageWithLayout = () => {
    const router = useRouter()
    const { setTitle } = useNavbar()

    useEffect(() => {
        setTitle('Ticket Detail')
    }, [])

    return (
        <div className="px-4">
            <div className="flex items-center justify-between">
                <BackButton
                    text={'Tickets'}
                    link={'/portals/admin/tickets?tab=my-open-tickets'}
                />
                <Button text={'Close Ticket'} variant={'dark'} />
            </div>

            <Card>
                <div className="flex justify-between">
                    <div>
                        <Typography variant={'h3'}>
                            <span className="font-bold cursor-pointer">
                                [#0123] Subject of Ticket
                            </span>
                        </Typography>
                        <div className="flex items-center gap-x-1 mt-1">
                            <div className="rounded-full bg-success uppercase text-[11px] text-white px-1.5 whitespace-pre">
                                OPEN
                            </div>
                            <BsDot />
                            <Typography
                                variant={'label'}
                                color={'text-[#6B7280]'}
                            >
                                Ticket was opened by
                            </Typography>
                            <div className="rounded-full bg-secondary uppercase text-sm text-black px-1.5 whitespace-pre">
                                Admin
                            </div>
                            <Typography
                                variant={'label'}
                                color={'text-[#6B7280]'}
                            >
                                On Monday, 5 June, 2023 at 11:00 am
                            </Typography>
                        </div>
                    </div>
                    <div className="flex gap-x-12">
                        <div>
                            <Typography color={'text-gray-400'} variant={'xs'}>
                                Created By:
                            </Typography>
                            <TicketUser
                                small
                                ticket={{ user: { name: 'Saad' } }}
                            />
                        </div>
                        <div>
                            <Typography color={'text-gray-400'} variant={'xs'}>
                                Created By:
                            </Typography>
                            <TicketUser
                                small
                                ticket={{ user: { name: 'Saad' } }}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

Tickets.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Tickets
