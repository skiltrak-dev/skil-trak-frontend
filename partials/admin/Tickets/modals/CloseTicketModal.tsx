import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { TicketStatus } from 'pages/portals/admin/tickets'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'

export const CloseTicketModal = ({
    ticket,
    onCancel,
}: {
    ticket: any
    onCancel: Function
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
