import {
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'
import { CommonApi } from '@queries'
import { NoteCard } from '../Card'

export const NotesView = ({
    userId,
    isPinned,
    isViewd,
}: {
    userId: number
    isViewd: boolean
    isPinned?: boolean
}) => {
    const notes = CommonApi.Notes.useList(
        { id: userId, isPinned },
        { skip: !userId || !isViewd }
    )
    return (
        <div className="px-4 py-3 box-border">
            {notes.isError ? (
                <TechnicalError
                    height="50vh"
                    description={false}
                    imageUrl={'/images/icons/common/notesError.png'}
                />
            ) : null}
            <div className="h-[380px] custom-scrollbar overflow-auto">
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
                                imageUrl={'/images/icons/common/notes.png'}
                                title="No Notes Attached"
                                description="Attach a note to view notes here"
                                height="40vh"
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
