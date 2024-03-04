import { Typography } from '@components'
import { IoDocumentTextOutline } from 'react-icons/io5'
type FolderCardProps = {
    active: any
    folderName: any
    onClick: () => void
}
export const FolderCard = ({
    active,
    folderName,
    onClick,
}: FolderCardProps) => {
    return (
        <div
            onClick={() => {
                if (onClick) {
                    onClick()
                }
            }}
            className={`cursor-pointer rounded-md p-2.5 shadow-lg ${
                active
                    ? 'bg-primaryNew'
                    : 'bg-white border border-secondary-dark '
            }`}
        >
            <div className={`flex items-center gap-x-2.5`}>
                <IoDocumentTextOutline
                    className={active ? 'text-white' : 'text-[#374151]'}
                    size={20}
                />
                <Typography
                    variant="xxs"
                    color={active ? 'text-white' : 'text-[#374151]'}
                    medium
                >
                    {folderName}
                </Typography>
            </div>
        </div>
    )
}
