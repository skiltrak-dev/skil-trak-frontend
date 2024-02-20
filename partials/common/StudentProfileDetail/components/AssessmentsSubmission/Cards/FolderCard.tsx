import { Typography } from '@components'
import { AssessmentEvidenceDetailType } from '@types'
import { HiOutlineDocumentText } from 'react-icons/hi'

export const FolderCard = ({
    active,
    folder,
    onClick,
}: {
    active: boolean
    onClick: () => void
    folder: AssessmentEvidenceDetailType
}) => {
    const response = folder?.studentResponse[0]

    const getStatusBadge = () => {
        switch (response?.status) {
            case 'approved':
                return (
                    <Typography color="text-primary" variant="xs" medium>
                        Approved
                    </Typography>
                )
            case 'pending':
                return (
                    <Typography color="text-primary" variant="xs" medium>
                        Pending
                    </Typography>
                )
            case 'rejected':
                return (
                    <Typography color="text-primary" variant="xs" medium>
                        Rejected
                    </Typography>
                )

            default:
                return (
                    <Typography color="text-primary" variant="xs" medium>
                        Not Assessed
                    </Typography>
                )
        }
    }
    return (
        <div
            onClick={() => {
                if (onClick) {
                    onClick()
                }
            }}
            className={`cursor-pointer p-2.5 ${
                active
                    ? 'bg-primaryNew'
                    : 'bg-white border border-secondary-dark'
            }  rounded-md flex items-center justify-between gap-x-2`}
        >
            <div className="flex items-center gap-x-2">
                <HiOutlineDocumentText
                    className={active ? 'text-white' : 'text-[#374151]'}
                />
                <Typography
                    variant="xxs"
                    color={active ? 'text-white' : 'text-[#374151]'}
                    medium
                >
                    {folder?.name}
                </Typography>
            </div>
            {getStatusBadge()}
        </div>
    )
}
