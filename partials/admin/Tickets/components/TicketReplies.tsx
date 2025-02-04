import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import {
    StatusEnum,
    TicketMessageCard,
} from '@partials/common/Tickets/components/TicketMessageCard'
import { ActionCard } from '@partials/sub-admin/Tickets'
import { CommonApi } from '@queries'
import { useEffect } from 'react'

export const TicketReplies = ({ ticket }: { ticket: any }) => {
    const replies = CommonApi.Tickets.useGetTicketReplies(ticket?.id, {
        skip: !ticket?.id,
    })
    const targetDate = new Date('2024-01-25')
    const createdAtDate = new Date(ticket?.createdAt)
    const [seenReply, seenReplyResult] = CommonApi.Tickets.useSeenTicketReply()

    // useEffect(() => {
    //     if (eventListener?.eventListener) {
    //         replies.refetch()
    //     }
    // }, [eventListener])

    useEffect(() => {
        seenReply(ticket?.id)
    }, [])

    return (
        <>
            {replies.isError && <TechnicalError />}
            {replies.isLoading ? (
                <LoadingAnimation height={'h-[50vh]'} />
            ) : replies?.data && replies.isSuccess ? (
                <>
                    <div className="flex flex-col gap-y-4 mt-4 ">
                        {replies?.data?.map((response: any) => {
                            return (
                                <>
                                    <TicketMessageCard
                                        key={response?.id}
                                        message={response}
                                        ticketDetail={ticket}
                                        replyId={response?.id}
                                    />
                                    {response?.action !== null &&
                                        response?.action?.action ===
                                            StatusEnum.FORWARDED && (
                                            <>
                                                <ActionCard
                                                    action={response?.action}
                                                />
                                            </>
                                        )}
                                </>
                            )
                        })}
                        {/* <TicketMessageCard
                            message={{
                                ...ticket,
                                author: ticket?.createdBy,
                            }}
                            replyId={updateReplyId}
                        /> */}
                        {createdAtDate < targetDate && (
                            <TicketMessageCard
                                message={{
                                    ...ticket,
                                    author: ticket?.createdBy,
                                }}
                                ticketDetail={ticket}
                                // replyId={ticket?.id}
                            />
                        )}
                    </div>
                </>
            ) : (
                !replies.isError &&
                replies.isSuccess && (
                    <EmptyData
                        title={'No Ticket Data'}
                        description={'No Ticket Detail were found'}
                    />
                )
            )}
        </>
    )
}
