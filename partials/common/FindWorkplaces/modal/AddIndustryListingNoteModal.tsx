import React, { useEffect, useRef, useState } from 'react'
import { Button, ShowErrorNotifications, TextArea } from '@components'
import { IoMdCloseCircle } from 'react-icons/io'
import { CommonApi } from '@queries'
import { useNotification } from '@hooks'
export const AddIndustryListingNoteModal = ({
    onCancel,
    id,
    noteData,
}: any) => {
    const [note, setNote] = useState<string>('')
    const { notification } = useNotification()
    // useAddFutureIndustryListingNote
    const [addNote, addNoteResult] =
        CommonApi.FindWorkplace.useAddFutureIndustryListingNote()

    useEffect(() => {
        if (noteData) {
            setNote(noteData)
        }
    }, [noteData])

    useEffect(() => {
        if (addNoteResult.isSuccess) {
            notification.success({
                title: `Note added`,
                description: `note added successfully`,
            })
            onCancel()
        }
    }, [addNoteResult])
    const onAddNote = () => {
        addNote({
            id: id,
            body: { note: note },
        })
    }
    return (
        <>
            <ShowErrorNotifications result={addNoteResult} />

            <div
                onClick={onCancel}
                className="flex justify-end cursor-pointer border-b p-2 mb-2"
            >
                <IoMdCloseCircle size={25} className="text-red-500" />
            </div>
            <div className="px-4 py-2">
                <h1>Note</h1>
                <TextArea
                    onChange={(e: any) => {
                        setNote(e?.target?.value)
                    }}
                    name="note"
                    value={note}
                    rows={5}
                    placeholder="Enter Note here..."
                />
                <Button
                    text={noteData ? 'Edit Note' : 'Add Note'}
                    onClick={onAddNote}
                    outline={noteData ? true : false}
                    loading={addNoteResult?.isLoading}
                    disabled={addNoteResult?.isLoading}
                />
            </div>
        </>
    )
}
