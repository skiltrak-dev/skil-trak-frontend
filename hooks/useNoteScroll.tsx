import React, { ReactElement, ReactNode, useContext, useState } from 'react'

// utils

interface NoteScrollContextType {
    selectedNoteId: number
    onSetSelectedNoteId: (val: number) => void
    // onSetSelectedNoteId: Dispatch<SetStateAction<number>>
}

export const NoteScrollContext =
    React.createContext<NoteScrollContextType | null>(null)

export const NoteScrollProvider = ({
    children,
}: {
    children: ReactElement | ReactNode
}) => {
    const [selectedNoteId, setSelectedNoteId] = useState<number>(0)

    const onSetSelectedNoteId = (val: number) => {
        setSelectedNoteId(val)
    }

    const value = {
        selectedNoteId,
        onSetSelectedNoteId,
    }

    return (
        <NoteScrollContext.Provider value={value}>
            {children}
        </NoteScrollContext.Provider>
    )
}

export const useNoteScroll = () => {
    return useContext(NoteScrollContext) as NoteScrollContextType
}
