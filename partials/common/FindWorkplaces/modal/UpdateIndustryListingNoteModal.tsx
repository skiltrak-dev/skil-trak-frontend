import React, { useEffect, useRef, useState } from 'react'
import {
    Button,
    Card,
    Portal,
    ShowErrorNotifications,
    TextArea,
} from '@components'
import { IoMdCloseCircle } from 'react-icons/io'
import { CommonApi } from '@queries'
import { useNotification } from '@hooks'
export const UpdateIndustryListingNoteModal = ({
    onCancel,
    id,
    noteData,
}: any) => {
    const comment = noteData?.comment ?? ''
    const [note, setNote] = useState<any>(comment)

    const { notification } = useNotification()
    // useAddFutureIndustryListingNote
    const [addNote, addNoteResult] =
        CommonApi.FindWorkplace.useUpdateFutureIndustryNote()

    useEffect(() => {
        if (noteData) {
            setNote(noteData?.comment)
        }
    }, [noteData])

    useEffect(() => {
        if (addNoteResult.isSuccess) {
            notification.success({
                title: `Note updated`,
                description: `Note updated successfully`,
            })
            onCancel(false)
        }
    }, [addNoteResult])
    const onAddNote = () => {
        addNote({
            id: noteData?.id,
            body: { comment: note },
        })
    }
    return (
        <Card>
            <ShowErrorNotifications result={addNoteResult} />

            <div
                onClick={() => {
                    onCancel(false)
                }}
                className="flex justify-between cursor-pointer border-b p-2 mb-2"
            >
                <p>Edit Note</p>
                <IoMdCloseCircle size={25} className="text-red-500" />
            </div>
            <div className="px-4 py-2">
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
                    text={'Update Note'}
                    onClick={onAddNote}
                    outline={noteData ? true : false}
                    loading={addNoteResult?.isLoading}
                    disabled={addNoteResult?.isLoading}
                />
            </div>
        </Card>
    )
}
