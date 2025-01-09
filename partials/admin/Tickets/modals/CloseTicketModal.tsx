import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { TicketStatus } from '@partials/common/Tickets'
import { CommonApi } from '@queries'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'

export const CloseTicketModal = ({
    ticket,
    onCancel,
}: {
    ticket: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [closeTicket, closeTicketResult] = CommonApi.Tickets.useCloseTicket()

    const onConfirmClicked = async (ticket: any) => {
        closeTicket({ id: ticket?.id, status: TicketStatus.CLOSED })
    }

    useEffect(() => {
        if (closeTicketResult.isSuccess) {
            notification.success({
                title: 'Ticket Closes',
                description: 'Ticket Closed Successfully',
            })
            onCancel()
        }
    }, [closeTicketResult])

    return (
        <>
            <ShowErrorNotifications result={closeTicketResult} />
            <ActionModal
                Icon={FaBan}
                variant="error"
                title="Are you sure!"
                description={`You are about to Close Ticket <em>"${ticket?.subject}"</em>. Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                actionObject={ticket}
                loading={closeTicketResult.isLoading}
            />
        </>
    )
}
