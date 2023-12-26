import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import React, { useEffect } from 'react'
import { ESignTitleCard } from '../components'

type Props = {
    setSelectedFolder: (e: any) => void
    selectedFolder: any
    pendingDocuments: any
}

export const ESignTitleCards = ({
    selectedFolder,
    pendingDocuments,
    setSelectedFolder,
}: Props) => {
    return (
        <>
            <div className="p-2">
                <Typography variant="muted" color="text-gray-400">
                    Selected Folder
                </Typography>
                <Typography variant="label" color="text-black">
                    {selectedFolder?.template?.name}
                </Typography>
            </div>
            {pendingDocuments?.map((doc: any, index: number) => (
                <ESignTitleCard
                    key={index}
                    doc={doc}
                    onClick={() => setSelectedFolder(doc)}
                    selectedFolder={selectedFolder}
                />
            ))}
        </>
    )
}
