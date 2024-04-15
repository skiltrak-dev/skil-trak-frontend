import { Button, Modal, Typography } from '@components'
import { UserRoles } from '@constants'
import { useRouter } from 'next/router'

import { LuLayoutTemplate } from 'react-icons/lu'

export const ShowWarningModal = ({
    onCancel,
    onConfirmClick,
    loading,
    remainingRecipents,
}: {
    loading: boolean
    onCancel: () => void
    onConfirmClick: () => void
    remainingRecipents: UserRoles[]
}) => {
    const router = useRouter()

    return (
        <>
            <Modal
                title="Are you sure!"
                subtitle="Are you sure you want to save template!"
                onCancelClick={() => onCancel()}
                confirmText="Save Template"
                onConfirmClick={() => onConfirmClick()}
                loading={loading}
            >
                <Typography variant="label">
                    <span className="uppercase">
                        {remainingRecipents?.join(', ')}
                    </span>{' '}
                    Signers is missing, are you still want to save the template
                </Typography>
            </Modal>
        </>
    )
}
