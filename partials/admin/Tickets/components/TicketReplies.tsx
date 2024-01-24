import React, { useEffect, useState } from 'react'
import { CommonApi } from '@queries'
import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { useSocketListener } from '@hooks'
import {
    StatusEnum,
    TicketMessageCard,
} from '@partials/common/Tickets/components/TicketMessageCard'
import { ActionCard } from '@partials/sub-admin/Tickets'

export const TicketReplies = ({ ticket }: { ticket: any }) => {
    const { eventListener } = useSocketListener()
    const replies = CommonApi.Tickets.useGetTicketReplies(ticket?.id, {
        skip: !ticket?.id,
    })
    const [seenReply, seenReplyResult] = CommonApi.Tickets.useSeenTicketReply()

    useEffect(() => {
        if (eventListener?.eventListener) {
            replies.refetch()
        }
    }, [eventListener])

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
                            console.log("replies", response)
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
