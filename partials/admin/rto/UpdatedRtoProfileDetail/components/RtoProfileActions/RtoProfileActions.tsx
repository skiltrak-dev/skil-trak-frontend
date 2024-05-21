import { Button } from '@components'
import { useActionModals } from '@partials/admin/rto/hooks/useActionModals'
import { Rto, User, UserStatus } from '@types'
import React, { ReactElement, useState } from 'react'
import { RtoProfileGallery } from '../RtoProfileGallery'
import { RtoTickets } from '../RtoTickets'
export const RtoProfileActions = ({ rto }: { rto: Rto }) => {
    const [modalView, setModalView] = useState<ReactElement | null>(null)
    const {
        modal,
        onAcceptClicked,
        onRejectClicked,
        onArchiveClicked,
        onUnArchiveClicked,
        onUnblockClicked,
        onDeleteClicked,
        onBlockClicked,
    } = useActionModals()

    const statusBaseActions = () => {
        switch (rto?.user?.status) {
            case UserStatus.Pending:
                return (
                    <>
                        <Button
                            text="Accept"
                            variant="success"
                            fullWidth
                            onClick={() => {
                                onAcceptClicked(rto)
                            }}
                        />
                        <Button
                            text="Reject"
                            variant="error"
                            fullWidth
                            onClick={() => {
                                onRejectClicked(rto)
                            }}
                        />
                    </>
                )
            case UserStatus.Approved:
                return (
                    <>
                        <Button
                            text="Archive"
                            variant="info"
                            fullWidth
                            onClick={() => {
                                onArchiveClicked(rto)
                            }}
                        />
                        <Button
                            text="Block"
                            variant="error"
                            fullWidth
                            onClick={() => {
                                onBlockClicked(rto)
                            }}
                        />
                    </>
                )
            case UserStatus.Blocked:
                return (
                    <>
                        <Button
                            text="Un Block"
                            variant="info"
                            fullWidth
                            onClick={() => {
                                onUnblockClicked(rto)
                            }}
                        />
                        <Button
                            text="Delete"
                            variant="error"
                            fullWidth
                            onClick={() => {
                                onDeleteClicked(rto)
                            }}
                        />
                    </>
                )
            case UserStatus.Rejected:
                return (
                    <>
                        <Button
                            text="Accept"
                            variant="info"
                            fullWidth
                            onClick={() => {
                                onAcceptClicked(rto)
                            }}
                        />
                        <Button
                            text="Delete"
                            variant="error"
                            fullWidth
                            onClick={() => {
                                onDeleteClicked(rto)
                            }}
                        />
                    </>
                )
            case UserStatus.Archived:
                return (
                    <>
                        <Button
                            text="Un Archive"
                            variant="error"
                            fullWidth
                            onClick={() => {
                                onUnArchiveClicked(rto)
                            }}
                        />
                        <Button
                            text="Delete"
                            variant="error"
                            fullWidth
                            onClick={() => {
                                onDeleteClicked(rto)
                            }}
                        />
                    </>
                )

            default:
                return
        }
    }

    const onModalCancelled = () => setModalView(null)

    const onGalleryClicked = () => {
        setModalView(<RtoProfileGallery onCancel={onModalCancelled} />)
    }

    const onTicketClicked = () => {
        setModalView(
            <RtoTickets rtoUser={rto?.user?.id} onCancel={onModalCancelled} />
        )
    }

    return (
        <div>
            {modal}
            {modalView}
            <div className="flex justify-between gap-x-1.5 py-4 border-y border-secondary-dark">
                {statusBaseActions()}
            </div>
            <div className="flex justify-between gap-x-1.5 py-4">
                <Button
                    text="Gallery"
                    fullWidth
                    onClick={() => {
                        onGalleryClicked()
                    }}
                />
                <Button
                    text="Tickets"
                    variant="primaryNew"
                    fullWidth
                    onClick={() => {
                        onTicketClicked()
                    }}
                />
            </div>
        </div>
    )
}
