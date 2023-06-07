import React, { useEffect } from 'react'
import { CommonApi } from '@queries'
import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { TicketMessageCard } from '@partials/common/Tickets'

export const TicketReplies = ({ ticket }: { ticket: any }) => {
    const replies = CommonApi.Tickets.useGetTicketReplies(ticket?.id, {
        skip: !ticket?.id,
    })

    const [seenReply, seenReplyResult] = CommonApi.Tickets.useSeenTicketReply()

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
                        {replies?.data?.map((response: any) => (
                            <TicketMessageCard
                                key={response?.id}
                                message={response}
                            />
                        ))}
                        <TicketMessageCard
                            message={{
                                ...ticket,
                                author: ticket?.createdBy,
                            }}
                        />
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
