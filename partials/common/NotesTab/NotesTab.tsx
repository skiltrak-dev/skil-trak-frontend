import { useEffect, useRef, useState } from 'react'

// components
import { CreateNote, EmptyData, LoadingAnimation, Note } from '@components'

// query
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'

export const NotesTab = ({
    user,
    onHandleScroll,
    selectedNoteId,
}: {
    user: any
    onHandleScroll?: any
    selectedNoteId?: number
}) => {
    const [editValues, setEditValues] = useState(null)

    const ref = useRef<any>()

    const router = useRouter()

    const notes = CommonApi.Notes.useList(user?.id, { skip: !user })

    useEffect(() => {
        if (selectedNoteId && notes?.data && notes?.data?.length) {
            const detailItem = document.getElementById(
                `pinned-notes-${selectedNoteId}`
            )
            if (detailItem) {
                console.log({ detailItem, data: notes?.data })
                setTimeout(() => {
                    detailItem.scrollIntoView({ behavior: 'smooth' })
                }, 500)
            }
        }
    }, [selectedNoteId, router, notes])

    return (
        <div
            ref={ref}
            className={`grid grid-cols-3 gap-x-2.5 w-full mt-2 mb-32`}
        >
            <div
                className={`col-span-2 flex flex-col gap-y-2.5 h-full w-full bg-gray-50 rounded-lg p-2`}
            >
                {notes?.isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <LoadingAnimation />
                    </div>
                ) : notes.data && notes.data?.length > 0 ? (
                    notes?.data?.map((note: any) => (
                        <Note
                            key={note.id}
                            note={note}
                            onHandleScroll={onHandleScroll}
                        />
                    ))
                ) : (
                    <EmptyData
                        imageUrl={'/images/icons/common/notes.png'}
                        title="No Notes Attached"
                        description="Attach a note to view notes here"
                        height="40vh"
                    />
                )}
            </div>
            {/* <div className={`w-3/5 flex-shrink`}> */}
            <div className={``}>
                <CreateNote
                    receiverId={Number(user?.id)}
                    editValues={editValues}
                    setEditValues={setEditValues}
                />
            </div>
        </div>
    )
}
