import { GlobalModal } from '@components'
import { ComposeMail } from '@partials/common/MailsListing'
import { Student } from '@types'
import React from 'react'

export const ComposeEmailModal = ({
    onCancel,
    student,
    parentId,
}: {
    student: Student
    onCancel: () => void
    parentId?: number
}) => {
    return (
        <GlobalModal>
            <ComposeMail
                parentId={parentId}
                onCancelComposeMail={onCancel}
                senderEmail={student?.user?.email}
            />
        </GlobalModal>
    )
}
