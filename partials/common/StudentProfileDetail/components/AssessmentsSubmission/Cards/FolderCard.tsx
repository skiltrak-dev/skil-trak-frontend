import { Tooltip, Typography } from '@components'
import { AssessmentEvidenceDetailType, StudentResponseType } from '@types'
import classNames from 'classnames'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { IoIosCheckboxOutline } from 'react-icons/io'
import { IoBagCheckSharp } from 'react-icons/io5'
import { PiHandshakeDuotone } from 'react-icons/pi'

export const FolderCard = ({
    active,
    folder,
    onClick,
}: {
    active: boolean
    onClick: () => void
    folder: AssessmentEvidenceDetailType
}) => {
    const response: StudentResponseType | null | undefined =
        folder?.studentResponse && folder?.studentResponse?.length > 0
            ? folder?.studentResponse?.find(
                  (item) => item?.files?.length > 0
              ) || folder?.studentResponse?.[0]
            : null

    // const response: StudentResponseType | null =
    //     folder?.studentResponse && folder?.studentResponse?.length > 0
    //         ? folder?.studentResponse?.[0]
    //         : null

    const getStatusBadge = (isAgreement?: boolean) => {
        switch (response?.status) {
            case 'approved':
                return (
                    <Typography color="text-success" variant="xs" medium>
                        Approved
                    </Typography>
                )
            case 'pending':
                return (
                    <Typography
                        color={isAgreement ? 'text-white' : 'text-primary'}
                        variant="xs"
                        medium
                    >
                        Pending
                    </Typography>
                )
            case 'rejected':
                return (
                    <Typography color="text-error" variant="xs" medium>
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

    const isAgreement = folder?.isAgreement
    const isFacilityCheckList = folder?.isFacilityCheckList

    const commentClasses = classNames({
        'text-[11px]': true,
        'text-gray-500': response?.status === 'pending' && !active,
        'text-success-dark': response?.status === 'approved' && !active,
        'text-red-700':
            (response?.status === 'rejected' ||
                response?.status === 'blocked') &&
            !active,
        'text-white': active,
    })

    const mainClasses = classNames({
        'bg-primaryNew': active,
        'bg-[#2ECC40]': isAgreement,
        'bg-[#FFDC00]': isFacilityCheckList,
        'bg-white border border-secondary-dark':
            !active && !isAgreement && !isFacilityCheckList,
    })

    return (
        <div
            onClick={() => {
                if (onClick) {
                    onClick()
                }
            }}
            className={`cursor-pointer p-2.5 ${mainClasses}  rounded-md flex flex-col gap-y-1`}
        >
            <div className="relative flex items-center justify-between gap-x-2">
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
                    {folder?.isIndustryCheck ? (
                        <div className="absolute right-2">
                            <div className="relative group">
                                <IoBagCheckSharp
                                    className={
                                        active ? 'text-white' : 'text-[#374151]'
                                    }
                                />
                                <Tooltip>Industry Check</Tooltip>
                            </div>
                        </div>
                    ) : null}
                    {folder?.isFacilityCheckList ? (
                        <div className="absolute right-2">
                            <div className="relative group">
                                <IoIosCheckboxOutline
                                    className={
                                        active ? 'text-white' : 'text-[#374151]'
                                    }
                                />
                                <Tooltip>Facility Check List</Tooltip>
                            </div>
                        </div>
                    ) : null}

                    {folder?.isAgreement && (
                        <PiHandshakeDuotone
                            className={`${
                                active ? 'text-white' : 'text-[#374151]'
                            }`}
                        />
                    )}
                    <Typography
                        variant={'small'}
                        color={active ? 'text-white' : 'text-[#374151]'}
                    >
                        {response?.files?.length
                            ? `(${response?.files?.length})`
                            : '0'}
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
                        getStatusBadge(isAgreement)
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
