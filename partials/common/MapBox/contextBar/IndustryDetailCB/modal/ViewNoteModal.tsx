import {
    Modal,
    EmptyData,
    Typography,
    TechnicalError,
    LoadingAnimation,
    Button,
    ActionButton,
} from '@components'
import { CommonApi } from '@queries'
import { NoteCard } from '@partials/common/StudentProfileDetail/components/Notes/Card'

export const ViewNoteModal = ({
    userId,
    onCancel,
    creatNote,
}: {
    creatNote: any
    userId: number
    onCancel: () => void
}) => {
    const notes = CommonApi.Notes.useList({ id: userId }, { skip: !userId })
    return (
        <Modal
            title="Notes"
            subtitle="View All Notes"
            showActions={false}
            onCancelClick={onCancel}
        >
            <div className="px-2 box-border">
                <div className="pb-2 flex justify-end">
                    <ActionButton
                        variant="info"
                        onClick={() => {
                            creatNote()
                        }}
                    >
                        Add Note
                    </ActionButton>
                </div>

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
                            [...notes?.data]
                                ?.sort(
                                    (a: any, b: any) =>
                                        b?.isPinned - a?.isPinned
                                )
                                ?.map((note: any) => (
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
        </Modal>
    )
}
