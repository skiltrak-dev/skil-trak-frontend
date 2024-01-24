import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { useSocketListener } from '@hooks'
import { TicketMessageCard } from '@partials/common/Tickets'
import { CommonApi } from '@queries'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const TicketReplies = ({ ticket }: { ticket: any }) => {
    const dispatch = useDispatch()
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
                        {replies?.data?.map((response: any) => (
                            <TicketMessageCard
                                key={response?.id}
                                message={response}
                                replyId={response?.id}
                            />
                        ))}
                        {/* <TicketMessageCard
                            message={{
                                ...ticket,
                                author: ticket?.createdBy,
                            }}
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
