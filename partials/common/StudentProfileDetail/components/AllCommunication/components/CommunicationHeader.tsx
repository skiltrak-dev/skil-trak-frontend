import { Button, Typography } from '@components'
import { ComposeMailModal } from '@partials/common/StudentProfileDetail/modals'
import { ReactElement, useState } from 'react'

interface CommunicationHeaderProps {
    user?: any
}

export const CommunicationHeader = ({ user }: CommunicationHeaderProps) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancelClicked = () => setModal(null)

    const onComposeMail = () => {
        setModal(
            <ComposeMailModal
                user={user}
                userId={user?.id}
                onCancel={onCancelClicked}
            />
        )
    }
    return (
        <>
            {modal}
            <div className="flex items-center justify-between mb-4 p-4 bg-white border-b">
                <Typography variant="body" semibold color="text-gray-900">
                    Recent Communications
                </Typography>
                <Button
                    variant="info"
                    onClick={() => {
                        onComposeMail()
                    }}
                >
                    + Compose New
                </Button>
            </div>
        </>
    )
}
