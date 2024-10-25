import { AuthorizedUserComponent, Typography } from '@components'
import { ellipsisText, getUserCredentials } from '@utils'
import React from 'react'
import { TicketDataCard } from './TicketDataCard'
import moment from 'moment'
import { useRouter } from 'next/router'
import { UserRoles } from '@constants'

export const TicketCard = ({ ticket }: { ticket: any }) => {
    const router = useRouter()

    const role = getUserCredentials()?.role

    return (
        <div className="h-full bg-primaryNew-dark rounded-lg overflow-hidden py-4 px-2.5 relative">
            <div className="grid grid-cols-3 gap-x-4 gap-y-2.5">
                <TicketDataCard title={'Subject'}>
                    [#{String(ticket?.id)?.padStart(5, '0')}]
                    {ellipsisText(ticket?.subject, 28)}
                </TicketDataCard>
                <TicketDataCard
                    title={'Created by'}
                    text={ticket?.createdBy?.name}
                    subText={ticket?.createdBy?.email}
                />
                <TicketDataCard
                    title={'Assigned To'}
                    text={ticket?.assignedTo?.name}
                    subText={ticket?.assignedTo?.email}
                />
                <TicketDataCard title={'Priority'} text={ticket?.priority} />
                <TicketDataCard title={'Replies'} text={ticket?.replies} />
                <TicketDataCard
                    title={'Last Activity'}
                    text={moment(ticket?.updatedAt).fromNow()}
                />
            </div>
            <AuthorizedUserComponent excludeRoles={[UserRoles.OBSERVER]}>
                <div
                    onClick={() => {
                        router.push(
                            `${
                                role === UserRoles.ADMIN
                                    ? `/portals/admin/tickets/detail/${ticket?.id}`
                                    : role === UserRoles.SUBADMIN
                                    ? `/portals/sub-admin/tickets/detail/${ticket?.id}`
                                    : role === UserRoles.RTO
                                    ? `/portals/rto/tickets/detail/${ticket?.id}`
                                    : ''
                            }`
                        )
                    }}
                    className="flex justify-center items-center mt-4 cursor-pointer"
                >
                    <Typography
                        underline
                        variant="xs"
                        bold
                        color="text-[#F67F1E]"
                    >
                        VIEW DETAILS
                    </Typography>
                </div>
            </AuthorizedUserComponent>
        </div>
    )
}
