type AssessmentFolderCardProps = {
    name?: string
    isActive?: boolean
    response?: any
    onClick?: () => void
    selectedFolderId?: string | null
    id?: string
    assessment?: boolean
}
import { Badge } from '@components'
import { Typography } from '@components/Typography'
import classNames from 'classnames'
import { FaFolder } from 'react-icons/fa'
export const AssessmentFolderCard = ({
    name,
    isActive,
    response,
    onClick,
    selectedFolderId,
    id,
    assessment,
}: AssessmentFolderCardProps) => {
    const statusColor = isActive
        ? 'bg-green-100'
        : !isActive
        ? 'bg-red-100'
        : 'bg-blue-100'

    const getStatusBadge = () => {
        switch (response?.status) {
            case 'approved':
                return (
                    <Badge
                        text={'Approved'}
                        variant="success"
                        shape="pill"
                        size="xs"
                    />
                )
            case 'pending':
                return (
                    <Badge
                        text={'Pending'}
                        variant="warning"
                        shape="pill"
                        size="xs"
                    />
                )
            case 'rejected':
                return (
                    <Badge
                        text={'Rejected'}
                        variant="error"
                        shape="pill"
                        size="xs"
                    />
                )
            default:
                return (
                    <Badge
                        text={'Not Assessed'}
                        variant="muted"
                        shape="pill"
                        size="xs"
                    />
                )
        }
    }

    const commentClasses = classNames({
        'text-xs': true,
        'text-gray-500': response?.status === 'pending',
        'text-green-700': response?.status === 'approved',
        'text-red-700': response?.status === 'rejected',
    })
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
                        <Typography variant={'small'}>
                            {response?.files?.length &&
                                `(${response?.files?.length})`}
                        </Typography>
                    </div>
                    <div>
                        <div className={` px-2 `}>
                            {assessment &&
                            response &&
                            response?.files?.length > 0
                                ? getStatusBadge()
                                : null}
                            {/* {isActive ? (
                            ) : (
                                <Badge text="Not Approved" variant="error" />
                            )} */}
                        </div>
                    </div>
                </div>
                {response && (
                    <div>
                        <p className={commentClasses}>{response?.comment}</p>
                    </div>
                )}
            </div>
        </>
    )
}
