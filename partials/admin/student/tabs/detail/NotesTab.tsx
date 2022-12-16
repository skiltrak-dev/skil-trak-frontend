import { useEffect, useState } from 'react'
import {
    EmptyData,
    LoadingAnimation,
    Note,
    NoteForm,
    TechnicalError,
} from '@components'
import { useContextBar } from '@hooks'
import { CommonApi } from '@queries'

import { Note as NoteType } from '@types'

export const NotesTab = ({ student }: { student: any }) => {
    const contextBar = useContextBar()
    const [approvedUser, setApprovedUser] = useState<boolean | null>(null)

    useEffect(() => {
        if (student) {
            setApprovedUser(student?.user.status === 'approved')
        }
    }, [student])

    const notes = CommonApi.Notes.useList(student?.user?.id, {
        skip: !student,
    })

    return (
        <div
            className={`flex gap-x-2.5 w-full ${
                contextBar.isVisible ? 'flex-col' : 'flex-row'
            }`}
        >
            <div
                className={`${
                    contextBar.isVisible
                        ? 'w-full'
                        : !approvedUser
                        ? 'w-full'
                        : 'w-[71%]'
                } bg-gray-50 rounded-lg p-2`}
            >
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
            {approvedUser && (
                <div
                    className={`${contextBar.isVisible ? 'w-full' : 'w-[29%]'}`}
                >
                    <NoteForm id={student?.user?.id} />
                </div>
            )}
        </div>
    )
}
