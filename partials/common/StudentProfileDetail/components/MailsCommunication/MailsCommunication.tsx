import { Button, Card, TabProps } from '@components'
import { User } from '@types'
import { ReactElement, useState } from 'react'
import { ComposeMailModal } from '../../modals'
import { AllCommunication } from '../AllCommunication'
import { useWorkplaceHook } from '../Workplace/hooks'
import { WorkplaceHistory } from '../Workplace'

export const MailsCommunication = ({ student }: { student: any }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancelClicked = () => setModal(null)

    const onComposeMail = () => {
        setModal(
            <ComposeMailModal
                user={student.user}
                userId={student?.user?.id}
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
                
                <AllCommunication student={student} />
            </Card>
        </div>
    )
}
