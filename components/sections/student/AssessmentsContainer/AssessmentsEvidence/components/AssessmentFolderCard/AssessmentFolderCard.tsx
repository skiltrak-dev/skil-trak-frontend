type AssessmentFolderCardProps = {
    name?: string
    isActive?: boolean
    negativeComment?: string
    positiveComment?: string
    onClick?: Function
    selectedFolderId?: string | null
    id?: string
}
import { Typography } from '@components/Typography'
import { FaFolder } from 'react-icons/fa'
export const AssessmentFolderCard = ({
    name,
    isActive,
    negativeComment,
    positiveComment,
    onClick,
    selectedFolderId,
    id,
}: AssessmentFolderCardProps) => {
    const statusColor = isActive
        ? 'bg-green-100'
        : !isActive
        ? 'bg-red-100'
        : 'bg-blue-100'
    return (
        <>
            <div
                className={`${
                    selectedFolderId === id ? 'bg-red-100' : 'bg-white'
                } p-2 border-b border-gray-200 cursor-pointer`}
                onClick={() => {
                    onClick()
                }}
            >
                <div className="flex justify-between">
                    <div className="flex items-center gap-x-2 ">
                        <div className="">
                            <FaFolder className="text-blue-500" />
                        </div>
                        <div>
                            <Typography variant="label">{name}</Typography>
                        </div>
                    </div>
                    <div>
                        <div className={`${statusColor} px-2 `}>
                            <Typography
                                variant="body"
                                color={
                                    isActive
                                        ? 'text-green-500'
                                        : !isActive
                                        ? 'text-red-500'
                                        : 'text-blue-500'
                                }
                            >
                                {isActive ? 'Approved' : 'Not Approved'}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div>
                    <Typography
                        variant="small"
                        color={
                            isActive
                                ? 'text-green-500'
                                : !isActive
                                ? 'text-red-500'
                                : 'text-blue-500'
                        }
                    >
                        {isActive ? positiveComment : negativeComment}
                    </Typography>
                </div>
            </div>
        </>
    )
}
