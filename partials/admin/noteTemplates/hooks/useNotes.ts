import { AdminApi } from '@queries'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { NoteTemplateType } from '../components'

export const useNotes = (data: any) => {
    const [notes, setNotes] = useState<NoteTemplateType[]>([])

    const [swapNoteTemplate, swapNoteTemplateResult] =
        AdminApi.NotesTemplates.swapNoteTemplate()

    console.log({ notes })

    useEffect(() => {
        if (data?.data && data?.data?.length > 0) {
            setNotes(data?.data)
        }
    }, [data])

    const toggleExpand = (id: number) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id
                    ? { ...note, expanded: !note.expanded }
                    : { ...note, expanded: false }
            )
        )
    }

    const handleDragEnd = (oldIndex: number, newIndex: number) => {
        console.log({ oldIndex, newIndex })
        const noteData = notes?.[oldIndex]
        console.log({ noteData })
        swapNoteTemplate({ id: noteData?.id, index: newIndex + 1 })
        setNotes((prevNotes) => {
            const updated = arrayMove(prevNotes, oldIndex, newIndex)
            return updated.map((note, idx) => ({ ...note, sequence: idx + 1 }))
        })
    }

    return { notes, toggleExpand, handleDragEnd }
}
