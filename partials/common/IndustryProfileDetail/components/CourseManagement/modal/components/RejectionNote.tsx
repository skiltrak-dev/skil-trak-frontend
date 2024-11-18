// RejectionNote.tsx
import { Typography } from '@components'
import React from 'react'

interface RejectionNoteProps {
    note?: string
}

export const RejectionNote = ({ note }: RejectionNoteProps) => {
    if (!note) return null

    return (
        <div className="mt-4 bg-red-900 text-white rounded-lg p-4">
            <div>
                <Typography variant="subtitle" color="text-white">
                    Rejection Note
                </Typography>
                <Typography variant="small" color="text-white">
                    {note}
                </Typography>
            </div>
        </div>
    )
}
