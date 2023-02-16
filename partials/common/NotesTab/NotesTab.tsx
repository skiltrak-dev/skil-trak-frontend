import { useState } from 'react'

// components
import { CreateNote, EmptyData, LoadingAnimation, Note } from '@components'

// query
import { CommonApi } from '@queries'
import { NotesCard } from '@components/sections/subAdmin'

export const NotesTab = ({ user }: { user: any }) => {
    const [editValues, setEditValues] = useState(null)

    const notes = CommonApi.Notes.useList(user?.id, { skip: !user })

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
                        <Note key={note.id} note={note} />
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
            {user?.status === 'approved' && (
                <div className={`w-3/5 flex-shrink`}>
                    <CreateNote
                        receiverId={Number(user?.id)}
                        editValues={editValues}
                        setEditValues={setEditValues}
                    />
                </div>
            )}
        </div>
    )
}
