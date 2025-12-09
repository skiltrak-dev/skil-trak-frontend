import { User } from '@types'
import { GlobalModal } from '@components'
import { ComposeMail } from '@partials/common/MailsListing'

export const ComposeEmailModal = ({
    onCancel,
    user,
    parentId,
}: {
    user: User
    parentId?: number
    onCancel: () => void
}) => {
    return (
        <GlobalModal>
            <ComposeMail
                parentId={parentId}
                onCancelComposeMail={onCancel}
                senderEmail={user?.email}
            />
        </GlobalModal>
    )
}
