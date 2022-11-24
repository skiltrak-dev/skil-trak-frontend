import { useState, useEffect } from 'react'

// components
import { LoadingAnimation, CreateNote, EmptyData } from '@components'
import { NotesCard } from '../NotesCard'

// query
import { useGetNotesQuery } from '@queries'

// hooks
import { useContextBar } from 'hooks'

export const Notes = ({ id }: any) => {
    console.log('iddddd', id)
    const [notesList, setNotesList] = useState([])
    const [editValues, setEditValues] = useState(null)
    // const [approvedUser, setApprovedUser] = useState(
    //     data?.user?.status === 'approved'
    // )

    // hooks
    const { isVisible } = useContextBar()

    // query
    const notes = useGetNotesQuery({ id }, { skip: !id })

    useEffect(() => {
        notes.refetch()
    }, [notes.refetch])

    return (
        <div
            className={`flex gap-x-2.5 w-full ${
                isVisible ? 'flex-col' : 'flex-row'
            }`}
        >
            <div
                className={`${
                    isVisible ? 'w-full' : 'w-[71%]'
                } bg-gray-50 rounded-lg p-2`}
            >
                {/* {notes.isError && !notes.length > 0 && <TechnicalError />} */}
                <div className={`flex flex-col gap-y-2.5 h-full `}>
                    {notes?.isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <LoadingAnimation />
                        </div>
                    ) : notes?.data?.length > 0 ? (
                        notes?.data?.map((note: any) => (
                            <NotesCard
                                key={note.id}
                                note={note}
                                setEditValues={setEditValues}
                            />
                        ))
                    ) : (
                        !notes.isError && <EmptyData />
                    )}
                </div>
            </div>
            <div className={`${isVisible ? 'w-full' : 'w-[29%]'}`}>
                <CreateNote
                    receiverId={Number(id)}
                    editValues={editValues}
                    setEditValues={setEditValues}
                />
            </div>
        </div>
    )
}
