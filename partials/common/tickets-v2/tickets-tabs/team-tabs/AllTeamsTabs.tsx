import React, { useState } from 'react'
import { EmptyTicket, TicketCard } from '../../components'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { NoData, PageSize, Pagination } from '@components'
import { TicketListSkeleton } from '../../skeleton'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'

export const AllTeamsTabs = () => {
    const [itemPerPage, setItemPerPage] = useState(10)
    const [page, setPage] = useState(1)
    const router = useRouter()
    const tab = router.query.tab
    // useAutomatedTickets
    const { data, isLoading, isError } = CommonApi.Teams.useAutomatedTickets({
        search: `status:${tab === 'active' ? 'assigned' : 'resolved'}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const role = getUserCredentials()?.role

    return (
        <div className="space-y-2">
            {isError && <NoData isError />}
            {isLoading ? (
                <TicketListSkeleton />
            ) : data?.data?.length > 0 ? (
                <>
                    <div className="flex items-center justify-between">
                        <PageSize
                            itemPerPage={itemPerPage}
                            setItemPerPage={setItemPerPage}
                            records={data?.data?.length}
                        />
                        <Pagination
                            pagination={data?.pagination}
                            setPage={setPage}
                        />
                    </div>
                    {data?.data?.map((ticket: any, index: number) => (
                        <div
                            key={ticket.id}
                            className="animate-scale-in"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <TicketCard
                                ticket={ticket}
                                onClick={() => {
                                    if (role === UserRoles.RTO) {
                                        router.push(
                                            `/portals/rto/communications/tickets/${ticket?.id}`
                                        )
                                    } else if (role === UserRoles.ADMIN) {
                                        router.push(
                                            `/portals/admin/support-tickets/${ticket?.id}`
                                        )
                                    } else if (role === UserRoles.SUBADMIN) {
                                        router.push(
                                            `/portals/sub-admin/support-tickets/${ticket?.id}`
                                        )
                                    }
                                }}
                                // onViewStudentProfile={setSelectedStudentId}
                                // onViewIndustryProfile={setSelectedIndustryId}
                            />
                        </div>
                    ))}
                </>
            ) : (
                !isError && <EmptyTicket />
            )}
        </div>
    )
}
