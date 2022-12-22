import { useEffect, useState } from 'react'
import { EmptyData, LoadingAnimation, Note, NoteForm } from '@components'
import { useContextBar } from '@hooks'
import { CommonApi } from '@queries'

import { Note as NoteType } from '@types'

export const NotesTab = ({ student }: { student: any }) => {
    const contextBar = useContextBar()
    // const [approvedUser, setApprovedUser] = useState<boolean | null>(null)
    const approvedUser = student?.user.status === 'approved'

    // useEffect(() => {
    //     if (student) {
    //         setApprovedUser(student?.status === 'approved')
    //     }
    // }, [student])

    const notes = CommonApi.Notes.useList(student?.user?.id, {
        skip: !student?.id,
    })

    return (
        <div className={`flex gap-x-2.5 w-full mt-2 mb-32`}>
            <div
                className={`${
                    contextBar.isVisible
                        ? 'w-full'
                        : !approvedUser
                        ? 'w-full'
                        : 'w-[71%]'
                } bg-gray-50 rounded-lg p-2`}
            >
                {/* {notes.isError && !notes.length > 0 && <TechnicalError />} */}
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
                        <EmptyData
                            imageUrl={'/images/icons/common/notes.png'}
                            title="No Notes Attached"
                            description="Attach a note to view notes here"
                            height="40vh"
                        />
                    )}
                </div>
            </div>
            {approvedUser && (
                <div className={`w-3/5 flex-shrink`}>
                    <NoteForm id={student?.user?.id} />
                </div>
            )}
        </div>
    )
}
