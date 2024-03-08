import { Typography } from '@components'
import { FolderCard } from './FolderCard'
type IndustryDocsFoldersProps = {
    requiredDocsFolders: any
    selectedFolder: any
    onSelectFolder: any
}
export const IndustryDocsFolders = ({
    requiredDocsFolders,
    selectedFolder,
    onSelectFolder,
}: IndustryDocsFoldersProps) => {
    if (!selectedFolder && requiredDocsFolders && requiredDocsFolders.length > 0) {
        onSelectFolder(requiredDocsFolders[0]);
    }
    return (
        <div className="px-4">
            <div className='mb-4 mt-2'>
                <Typography variant="label" medium>
                    Required Document
                </Typography>
            </div>
            <div className="flex flex-col gap-y-2.5 h-[80%] overflow-auto custom-scrollbar pb-2">
                {requiredDocsFolders?.map((folder: any) => (
                    <FolderCard
                        folderName={folder?.name}
                        active={selectedFolder?.id === folder?.id}
                        onClick={() => onSelectFolder(folder)}
                    />
                ))}
            </div>
        </div>
    )
}
