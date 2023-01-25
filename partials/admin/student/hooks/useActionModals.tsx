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
} from '../modals'

export const useActionModals = (refetch: any) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [result, setResult] = useState<any | null>(null)

    useEffect(() => {
        if (result?.isSuccess) {
            refetch()
        }
    }, [result])

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onAcceptClicked = (item: Student) => {
        setModal(
            <AcceptModal
                setResult={setResult}
                item={item}
                onCancel={onModalCancelClicked}
            />
        )
    }
    const onRejectClicked = (item: Student) => {
        setModal(
            <RejectModal
                setResult={setResult}
                item={item}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onArchiveClicked = (student: Student) => {
        setModal(
            <ArchiveModal
                setResult={setResult}
                item={student}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onUnblockClicked = (student: Student) => {
        setModal(
            <UnblockModal
                setResult={setResult}
                item={student}
                onCancel={onModalCancelClicked}
            />
        )
    }
    const onDeleteClicked = (student: Student) => {
        setModal(<DeleteModal item={student} onCancel={onModalCancelClicked} />)
    }

    const onBlockClicked = (student: Student) => {
        setModal(
            <BlockModal
                setResult={setResult}
                item={student}
                onCancel={onModalCancelClicked}
            />
        )
    }

    return {
        modal,
        onBlockClicked,
        onAcceptClicked,
        onRejectClicked,
        onDeleteClicked,
        onUnblockClicked,
        onArchiveClicked,
    }
}
