import { useState } from 'react'

// components
import { CreateNote, EmptyData, LoadingAnimation } from '@components'
import { NotesCard } from '../NotesCard'

// query
import { SubAdminApi } from '@queries'

export const Notes = ({ id }: any) => {
    const [editValues, setEditValues] = useState(null)

    const notes = SubAdminApi.Notes.useList({ id })

    return (
        <div className={`flex gap-x-2.5 w-full mt-2 mb-32`}>
            <div
                className={`flex flex-col gap-y-2.5 h-full w-full bg-gray-50 rounded-lg p-2`}
            >
                {notes?.isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <LoadingAnimation />
                    </div>
                ) : notes.data && notes.data?.length > 0 ? (
                    notes?.data?.map((note: any) => (
                        <NotesCard
                            key={note.id}
                            note={note}
                            setEditValues={setEditValues}
                        />
                    ))
                ) : (
                    <EmptyData
                        imageUrl={'/images/icons/common/notes.png'}
                        title="No Notes Attached"
                        description="Attach a note to view notes here"
                    />
                )}
            </div>
            <div className={`w-3/5 flex-shrink`}>
                <CreateNote
                    receiverId={Number(id)}
                    editValues={editValues}
                    setEditValues={setEditValues}
                />
            </div>
        </div>
    )
}
