import { Student } from '@types'
import React, { ReactElement, useEffect, useState } from 'react'

// modals
import {
    AcceptModal,
    ArchiveModal,
    RejectModal,
    UnblockModal,
    DeleteModal,
    BlockModal,
    UnArchiveModal,
} from '../modals'

export const useActionModals = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [result, setResult] = useState<any | null>(null)

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onAcceptClicked = (item: Student) => {
        setModal(<AcceptModal item={item} onCancel={onModalCancelClicked} />)
    }
    const onRejectClicked = (item: Student) => {
        setModal(<RejectModal item={item} onCancel={onModalCancelClicked} />)
    }

    const onArchiveClicked = (student: Student) => {
        setModal(
            <ArchiveModal item={student} onCancel={onModalCancelClicked} />
        )
    }

    const onUnArchiveClicked = (student: Student) => {
        setModal(
            <UnArchiveModal student={student} onCancel={onModalCancelClicked} />
        )
    }

    const onUnblockClicked = (student: Student) => {
        setModal(
            <UnblockModal item={student} onCancel={onModalCancelClicked} />
        )
    }
    const onDeleteClicked = (student: Student) => {
        setModal(<DeleteModal item={student} onCancel={onModalCancelClicked} />)
    }

    const onBlockClicked = (student: Student) => {
        setModal(<BlockModal item={student} onCancel={onModalCancelClicked} />)
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
