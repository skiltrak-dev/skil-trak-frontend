import { Button, Card, TabProps } from '@components'
import { User } from '@types'
import { ReactElement, useState } from 'react'
import { ComposeMailModal } from '../../modals'
import { AllCommunication } from '../AllCommunication'

export const MailsCommunication = ({ user }: { user: User }) => {
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
        <div>
            {modal}
            <Card fullHeight noPadding>
                {/* <Button
                    onClick={() => {
                        onComposeMail()
                    }}
                >
                    Compose Mail
                </Button> */}
                <AllCommunication user={user} />
            </Card>
        </div>
    )
}
