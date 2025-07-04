import { Typography } from '@components/Typography'
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
    console.log({ pendingDocuments })
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
            <div className="h-96 overflow-auto">
                {pendingDocuments?.map((doc: any, index: number) => (
                    <ESignTitleCard
                        doc={doc}
                        key={index}
                        selectedFolder={selectedFolder}
                        onClick={() => setSelectedFolder(doc)}
                    />
                ))}
            </div>
        </>
    )
}
