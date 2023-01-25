import { Rto } from '@types'
import { ReactElement, useState } from 'react'

// modals
import {
    AcceptModal,
    ArchiveModal,
    BlockModal,
    DeleteModal,
    RejectModal,
    UnArchiveModal,
    UnblockModal,
} from '../modals'

export const useActionModals = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onAcceptClicked = (rto: Rto | undefined | null) => {
        setModal(<AcceptModal rto={rto} onCancel={onModalCancelClicked} />)
    }
    const onRejectClicked = (rto: Rto | undefined | null) => {
        setModal(<RejectModal rto={rto} onCancel={onModalCancelClicked} />)
    }

    const onArchiveClicked = (rto: Rto | undefined | null) => {
        setModal(<ArchiveModal item={rto} onCancel={onModalCancelClicked} />)
    }

    const onUnArchiveClicked = (rto: Rto | undefined | null) => {
        setModal(<UnArchiveModal item={rto} onCancel={onModalCancelClicked} />)
    }

    const onUnblockClicked = (rto: Rto | undefined | null) => {
        setModal(<UnblockModal rto={rto} onCancel={onModalCancelClicked} />)
    }
    const onDeleteClicked = (rto: Rto | undefined | null) => {
        setModal(<DeleteModal rto={rto} onCancel={onModalCancelClicked} />)
    }

    const onBlockClicked = (rto: Rto | undefined | null) => {
        setModal(<BlockModal rto={rto} onCancel={onModalCancelClicked} />)
    }

    return {
        modal,
        onBlockClicked,
        onAcceptClicked,
        onRejectClicked,
        onDeleteClicked,
        onUnblockClicked,
        onArchiveClicked,
        onUnArchiveClicked,
    }
}
