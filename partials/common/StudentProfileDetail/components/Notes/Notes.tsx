import {
    AuthorizedUserComponent,
    Button,
    Card,
    CreateNote,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'
import { useContextBar } from '@hooks'
import { CommonApi } from '@queries'
import { Waypoint } from 'react-waypoint'
import { NoteCard } from './Card'
import { useState } from 'react'
import { UserRoles } from '@constants'

export const Notes = ({
    userId,
    isPinned,
}: {
    userId: number
    isPinned?: boolean
}) => {
    const contextBar = useContextBar()

    const [isViewd, setIsViewd] = useState<boolean>(false)

    const notes = CommonApi.Notes.useList(
        { id: userId, isPinned },
        { skip: !userId || !isViewd }
    )

    const onAddNote = () => {
        contextBar.setTitle('Add Note')
        contextBar.setContent(<CreateNote receiverId={Number(userId)} />)
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

                    <div className="px-4 py-3 box-border">
                        {notes.isError ? (
                            <TechnicalError
                                height="50vh"
                                description={false}
                                imageUrl={'/images/icons/common/notesError.png'}
                            />
                        ) : null}
                        <div className="h-[410px] custom-scrollbar overflow-auto">
                            <div className="flex flex-col gap-y-3">
                                {notes.isLoading ? (
                                    <div className="flex flex-col items-center justify-center h-60">
                                        <LoadingAnimation size={60} />
                                        <Typography variant="label">
                                            Notes Loading...
                                        </Typography>
                                    </div>
                                ) : notes?.data && notes?.data?.length > 0 ? (
                                    notes?.data?.map((note: any) => (
                                        <NoteCard key={note?.id} note={note} />
                                    ))
                                ) : (
                                    notes.isSuccess && (
                                        <EmptyData
                                            imageUrl={
                                                '/images/icons/common/notes.png'
                                            }
                                            title="No Notes Attached"
                                            description="Attach a note to view notes here"
                                            height="40vh"
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </Waypoint>
    )
}
