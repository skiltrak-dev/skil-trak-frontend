type AssessmentFolderCardProps = {
    name?: string
    isActive?: boolean
    response?: any
    onClick?: () => void
    selectedFolderId?: string | null
    id?: string
}
import { Badge } from '@components'
import { Typography } from '@components/Typography'
import { FaFolder } from 'react-icons/fa'
export const AssessmentFolderCard = ({
    name,
    isActive,
    response,
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
                    selectedFolderId === id ? 'bg-blue-100' : 'bg-white'
                } p-2 border-b border-gray-200 cursor-pointer`}
                onClick={() => {
                    onClick?.()
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
                        <div className={` px-2 `}>
                            <Badge
                                text={
                                    response?.status === 'approved'
                                        ? 'Approved'
                                        : response?.status === 'pending'
                                        ? 'Pending'
                                        : response?.status === 'rejected'
                                        ? 'Rejected'
                                        : 'Not Assessed'
                                }
                                variant="success"
                            />
                            {/* {isActive ? (
                            ) : (
                                <Badge text="Not Approved" variant="error" />
                            )} */}
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
                        {response?.comment}
                    </Typography>
                </div>
            </div>
        </>
    )
}
