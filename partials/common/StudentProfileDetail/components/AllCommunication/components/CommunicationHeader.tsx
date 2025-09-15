import { AuthorizedUserComponent, Badge, Button, Typography } from '@components'
import { UserRoles } from '@constants'
import { ComposeMailModal } from '@partials/common/StudentProfileDetail/modals'
import { ReactElement, useState } from 'react'
import { WorkplaceHistory } from '../../Workplace'
import { useWorkplaceHook } from '../../Workplace/hooks'
import { ShowAllCommunicationModal } from '../modal'
import { CreateStudentNote } from '@partials/common/Notes/forms'

interface CommunicationHeaderProps {
    user?: any
}

export const CommunicationHeader = ({ user }: CommunicationHeaderProps) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const student = user
    const { selectedWorkplace } = useWorkplaceHook()
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

    const onAddNote = () => {
        setModal(
            <div
                className={`bg-[#00000050]  w-[calc(100%-80%)]
                 h-full flex items-center justify-center gap-x-2 fixed top-[4.4rem] right-0 z-40`}
            >
                <CreateStudentNote
                    studentId={user?.id}
                    onCancel={onCancelClicked}
                    receiverId={Number(user?.user?.id)}
                />
            </div>
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
                            <Button
                                onClick={() => {
                                    onAddNote()
                                }}
                            >
                                + Add Note
                            </Button>
                        </AuthorizedUserComponent>
                    )}
                    <Button
                        variant="info"
                        onClick={() => {
                            onComposeMail()
                        }}
                    >
                        + Compose Mail
                    </Button>
                </div>
            </div>
        </>
    )
}
