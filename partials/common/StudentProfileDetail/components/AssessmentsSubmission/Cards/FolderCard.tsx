import { Typography } from '@components'
import { AssessmentEvidenceDetailType, StudentResponseType } from '@types'
import classNames from 'classnames'
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
    const response: StudentResponseType | null =
        folder?.studentResponse && folder?.studentResponse?.length > 0
            ? folder?.studentResponse?.[0]
            : null

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

    const commentClasses = classNames({
        'text-[11px]': true,
        'text-gray-500': response?.status === 'pending' && !active,
        'text-green-700': response?.status === 'approved' && !active,
        'text-red-700':
            (response?.status === 'rejected' ||
                response?.status === 'blocked') &&
            !active,
        'text-white': active,
    })
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
            }  rounded-md flex flex-col gap-y-1`}
        >
            <div className="flex items-center justify-between gap-x-2">
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
                {response ? (
                    response?.reSubmitted ? (
                        <Typography
                            color={active ? 'text-blue-200' : 'text-info'}
                            variant="xs"
                            medium
                        >
                            Re-Submitted
                        </Typography>
                    ) : (
                        getStatusBadge()
                    )
                ) : null}
            </div>
            {response ? (
                <div>
                    <p className={commentClasses}>
                        {response?.reSubmitted && 'Previous Comment:'}{' '}
                        {response?.comment}
                    </p>
                </div>
            ) : null}
        </div>
    )
}
