import { AuthorizedUserComponent, Badge, Button, Typography } from '@components'
import { UserRoles } from '@constants'
import { ComposeMailModal } from '@partials/common/StudentProfileDetail/modals'
import { ReactElement, useState } from 'react'
import { WorkplaceHistory } from '../../Workplace'
import { useWorkplaceHook } from '../../Workplace/hooks'
import { ShowAllCommunicationModal } from '../modal'

interface CommunicationHeaderProps {
    user?: any
}

export const CommunicationHeader = ({ user }: CommunicationHeaderProps) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const student = user
    const { selectedWorkplace } = useWorkplaceHook({ student })
    const onCancelClicked = () => setModal(null)

    const onComposeMail = () => {
        setModal(
            <ComposeMailModal
                user={user?.user}
                userId={user?.user?.id}
                onCancel={onCancelClicked}
            />
        )
    }

    const onShowFullCommunication = () => {
        setModal(
            <ShowAllCommunicationModal user={user} onCancel={onCancelClicked} />
        )
    }
    return (
        <>
            {modal}
            <div className="flex items-center justify-between px-4 py-1.5 bg-white border-b">
                <Typography variant="body" semibold color="text-gray-900">
                    Recent Communications
                </Typography>

                <div className="flex items-center gap-x-2">
                    <Badge
                        text="View Full Screen"
                        variant="info"
                        onClick={onShowFullCommunication}
                    />
                    {user?.user?.role === UserRoles.STUDENT && (
                        <AuthorizedUserComponent
                            roles={[
                                UserRoles.SUBADMIN,
                                UserRoles.ADMIN,
                                UserRoles.RTO,
                            ]}
                        >
                            <WorkplaceHistory
                                wpId={Number(selectedWorkplace?.id)}
                            />
                        </AuthorizedUserComponent>
                    )}
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
