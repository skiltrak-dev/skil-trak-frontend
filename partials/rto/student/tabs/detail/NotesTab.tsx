import { useState } from 'react'
import { EmptyData, LoadingAnimation, Note, TechnicalError } from '@components'
import { useContextBar } from '@hooks'
import { CommonApi } from '@queries'

import { Note as NoteType } from '@types'

export const NotesTab = ({ student }: { student: any }) => {
    const notes = CommonApi.Notes.useList(student?.user?.id, {
        skip: !student,
    })

    return (
        <div className={`flex gap-x-2.5 w-full `}>
            <div className={`w-full bg-gray-50 rounded-lg p-2`}>
                {notes.isError && <TechnicalError />}
                <div className={`flex flex-col gap-y-2.5 h-full `}>
                    {notes?.isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <LoadingAnimation />
                        </div>
                    ) : notes?.data && notes?.data.length ? (
                        notes.data.map((note: NoteType) => (
                            <Note key={note.id} note={note} />
                        ))
                    ) : (
                        !notes.isError && (
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
