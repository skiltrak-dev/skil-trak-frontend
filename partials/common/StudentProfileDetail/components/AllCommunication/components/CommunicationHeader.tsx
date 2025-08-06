import { AuthorizedUserComponent, Button, Typography } from '@components'
import { ComposeMailModal } from '@partials/common/StudentProfileDetail/modals'
import { ReactElement, useState } from 'react'
import { useWorkplaceHook } from '../../Workplace/hooks'
import { WorkplaceHistory } from '../../Workplace'
import { UserRoles } from '@constants'

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
    return (
        <>
            {modal}
            <div className="flex items-center justify-between mb-4 p-4 bg-white border-b">
                <Typography variant="body" semibold color="text-gray-900">
                    Recent Communications
                </Typography>

                <div className="flex items-center gap-x-2">
                    <AuthorizedUserComponent
                        roles={[UserRoles.SUBADMIN, UserRoles.ADMIN, UserRoles.RTO]}
                    >
                        <WorkplaceHistory wpId={selectedWorkplace?.id} />
                    </AuthorizedUserComponent>
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
