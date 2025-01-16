import {
    AuthorizedUserComponent,
    Button,
    Card,
    CreateNote,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { useContextBar } from '@hooks'
import { useState } from 'react'
import { Waypoint } from 'react-waypoint'
import { NotesView } from './components'
import { CreateStudentNote } from './forms'

export const StudentProfileNotes = ({
    userId,
    isPinned,
    studentId,
}: {
    studentId: number
    userId: number
    isPinned?: boolean
}) => {
    const contextBar = useContextBar()

    const [isViewd, setIsViewd] = useState<boolean>(false)

    const onAddNote = () => {
        contextBar.setTitle('Add Note')
        contextBar.setContent(
            <CreateStudentNote
                studentId={studentId}
                receiverId={Number(userId)}
            />
        )
        contextBar.show(false)
    }

    return (
        <Waypoint
            onEnter={() => {
                setIsViewd(true)
            }}
        >
            <div className="h-full">
                <Card noPadding fullHeight>
                    <div className="px-4 py-3.5 flex justify-between items-center border-b border-secondary-dark">
                        <Typography variant="label" semibold>
                            Notes
                        </Typography>
                        <AuthorizedUserComponent
                            excludeRoles={[UserRoles.OBSERVER]}
                        >
                            <Button onClick={onAddNote}>Add Note</Button>
                        </AuthorizedUserComponent>
                    </div>

                    <NotesView
                        userId={userId}
                        isViewd={isViewd}
                        isPinned={isPinned}
                    />
                </Card>
            </div>
        </Waypoint>
    )
}
