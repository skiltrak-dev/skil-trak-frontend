import { Button, Typography } from '@components'
import { ComposeMailModal } from '@partials/common/StudentProfileDetail/modals'
import { ReactElement, useState } from 'react'
import { useWorkplaceHook } from '../../Workplace/hooks'
import { WorkplaceHistory } from '../../Workplace'

interface CommunicationHeaderProps {
    student?: any
}

export const CommunicationHeader = ({ student }: CommunicationHeaderProps) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const { selectedWorkplace } = useWorkplaceHook({ student })
    const onCancelClicked = () => setModal(null)

    const onComposeMail = () => {
        setModal(
            <ComposeMailModal
                user={student?.user}
                userId={student?.user?.id}
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

                <div className="flex items-center gap-x-2">
                    <WorkplaceHistory
                        wpId={selectedWorkplace?.id}
                    />
                    <Button
                        variant="info"
                        onClick={() => {
                            onComposeMail()
                        }}
                    >
                        + Compose New
                    </Button>
                </div>
            </div>
        </>
    )
}
