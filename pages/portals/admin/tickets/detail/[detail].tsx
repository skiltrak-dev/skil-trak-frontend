import { ReactElement, useEffect, useState } from 'react'

// Layouts
import { AdminLayout } from '@layouts'
// Types
import {
    BackButton,
    Button,
    EmptyData,
    LoadingAnimation,
    Portal,
    ShowErrorNotifications,
    TechnicalError,
    draftToHtmlText,
} from '@components'
import { useNavbar, useNotification } from '@hooks'
import { ReplyTicketForm } from '@partials/common/Tickets'
import {
    TicketDetailHeaderCard,
    TicketMessageCard,
} from '@partials/common/Tickets/components'
import { NextPageWithLayout } from '@types'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { CloseTicketModal, TicketReplies } from '@partials/admin/Tickets'
import { TicketStatus } from '../index'

const Tickets: NextPageWithLayout = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const { setTitle } = useNavbar()
    const router = useRouter()
    const { notification } = useNotification()

    const ticketDetail = CommonApi.Tickets.useGetDetail(
        Number(router.query.detail),
        {
            skip: !router.query.detail,
        }
    )
    const [addReply, addReplyResult] = CommonApi.Tickets.useAddReply()

    useEffect(() => {
        setTitle('Ticket Detail')
    }, [])

    const onCancel = () => {
        setModal(null)
    }

    const onCloseClicked = () => {
        setModal(
            <Portal>
                <CloseTicketModal
                    onCancel={onCancel}
                    ticket={ticketDetail?.data}
                />
            </Portal>
        )
    }

    const onSubmit = (values: any) => {
        const message = draftToHtmlText(values?.message)
        addReply({
            ticket: ticketDetail?.data?.id,
            message,
        })
    }

    const isOpened =
        ticketDetail?.data?.status === TicketStatus.OPEN ||
        ticketDetail?.data?.status === TicketStatus.REOPENED

    return (
        <>
            {modal}

            <ShowErrorNotifications result={addReplyResult} />
            <div className="px-4">
                <div className="flex items-center justify-between mb-4">
                    <BackButton
                        text={'Tickets'}
                        link={'/portals/admin/tickets?tab=my-open-tickets'}
                    />
                    {ticketDetail.isSuccess && ticketDetail?.data && (
                        <Button
                            variant={isOpened ? 'dark' : 'info'}
                            text={isOpened ? 'Close Ticket' : 'Re Open'}
                            onClick={() => {
                                if (isOpened) {
                                    onCloseClicked()
                                }
                            }}
                        />
                    )}
                </div>
                {ticketDetail.isError && <TechnicalError />}
                {ticketDetail.isLoading ? (
                    <LoadingAnimation height={'h-[50vh]'} />
                ) : ticketDetail?.data && ticketDetail.isSuccess ? (
                    <>
                        <div className="h-[calc(100vh-380px)] overflow-auto custom-scrollbar">
                            <div className="sticky top-0 z-20">
                                <TicketDetailHeaderCard
                                    ticket={ticketDetail?.data}
                                />
                            </div>

                            <TicketReplies ticket={ticketDetail?.data} />
                        </div>
                        <div className="mt-2 fixed bottom-0 h-64 w-[calc(100%-255px)]">
                            <ReplyTicketForm
                                onSubmit={onSubmit}
                                result={addReplyResult}
                                isOpened={isOpened}
                            />
                        </div>
                    </>
                ) : (
                    !ticketDetail.isError &&
                    ticketDetail.isSuccess && (
                        <EmptyData
                            title={'No Ticket Data'}
                            description={'No Ticket Detail were found'}
                        />
                    )
                )}
            </div>
        </>
    )
}

Tickets.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Tickets
