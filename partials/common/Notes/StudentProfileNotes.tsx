import { AuthorizedUserComponent, Button, Card, Typography } from '@components'
import { UserRoles } from '@constants'
import { ReactNode, useState } from 'react'
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
    const [isViewd, setIsViewd] = useState<boolean>(false)
    const [modal, setModal] = useState<ReactNode>(null)

    const onCancel = () => {
        setModal(null)
    }
    const onAddNote = () => {
        // router.push({
        //     pathname: router.pathname,
        //     query: { ...router.query, tab: 'notes' }, // Retain existing query params, including `id`
        // })

        // // contextBar.setTitle('Add Note')
        // contextBar.setContent(
        //     <CreateStudentNote
        //         studentId={studentId}
        //         receiverId={Number(userId)}
        //     />
        // )

        // contextBar.show(false)

        setModal(
            <div
                className={`bg-[#00000050]  w-[calc(100%-80%)]
                 h-full flex items-center justify-center gap-x-2 fixed top-[4.4rem] right-0 z-40`}
            >
                <CreateStudentNote
                    studentId={studentId}
                    receiverId={Number(userId)}
                    onCancel={onCancel}
                />
            </div>
        )
    }

    return (
        <>
            {modal && modal}
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
        </>
    )
}
