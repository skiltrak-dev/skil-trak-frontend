import { CustomDropdown, TableAction } from '@components'
import { Industry, Student, UserStatus } from '@types'
import React, { ReactElement, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import {
    ApproveIndustryWithQuestionsModal,
    ArchiveModal,
    BlockModal,
    DeleteModal,
    RejectModal,
    UnArchiveModal,
    UnblockModal,
} from '../../modal'

export const IndustryStatus = ({ industry }: { industry: Industry }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancelClicked = () => setModal(null)

    const onApproveClicked = () => {
        setModal(
            <ApproveIndustryWithQuestionsModal
                industry={industry}
                onCancel={onCancelClicked}
            />
        )
    }
    const onArchiveClicked = () => {
        setModal(<ArchiveModal item={industry} onCancel={onCancelClicked} />)
    }
    const onBlockClicked = () => {
        setModal(<BlockModal industry={industry} onCancel={onCancelClicked} />)
    }
    const onDeleteClicked = () => {
        setModal(<DeleteModal industry={industry} onCancel={onCancelClicked} />)
    }
    const onRejectClicked = () => {
        setModal(<RejectModal industry={industry} onCancel={onCancelClicked} />)
    }
    const onUnArchiveClicked = () => {
        setModal(
            <UnArchiveModal industry={industry} onCancel={onCancelClicked} />
        )
    }
    const onUnblockClicked = () => {
        setModal(
            <UnblockModal industry={industry} onCancel={onCancelClicked} />
        )
    }

    const dropdownOptions = [
        {
            text: 'Approve',
            status: UserStatus.Approved,
            includes: [
                UserStatus.Pending,
                UserStatus.Rejected,
                UserStatus.Blocked,
            ],
            color: 'text-success-dark',
            onClick: () => {
                onApproveClicked()
            },
            Icon: FaEye,
        },
        {
            text: 'Archive',
            includes: [UserStatus.Approved],
            color: 'text-info-600',
            onClick: () => {
                onArchiveClicked()
            },
            status: UserStatus.Archived,
            Icon: FaEye,
        },
        {
            includes: [UserStatus.Approved],
            text: 'Block',
            color: 'text-red-600',
            onClick: () => {
                onBlockClicked()
            },
            status: UserStatus.Blocked,
            Icon: FaEye,
        },
        {
            text: 'Un Archive',
            includes: [UserStatus.Archived],
            color: 'text-info-600',
            onClick: () => {
                onUnArchiveClicked()
            },
            status: UserStatus.Blocked,
            Icon: FaEye,
        },
        {
            text: 'Un Block',
            color: 'text-slate-600',
            onClick: () => {
                onUnblockClicked()
            },
            includes: [UserStatus.Blocked],
            status: UserStatus.Blocked,
            Icon: FaEye,
        },
        {
            includes: [UserStatus.Pending],
            text: 'Reject',
            color: 'text-red-600',
            onClick: () => {
                onRejectClicked()
            },
            status: UserStatus.Rejected,
            Icon: FaEye,
        },
        {
            includes: [
                UserStatus.Blocked,
                UserStatus.Archived,
                UserStatus.Rejected,
            ],
            text: 'Delete',
            color: 'text-red-600',
            onClick: () => {
                onDeleteClicked()
            },
            Icon: FaEye,
        },
    ]

    const insustryStatus = dropdownOptions?.find(
        (option) => option?.status === industry?.user?.status
    )

    const options = dropdownOptions?.filter((option) =>
        option?.includes?.includes(industry?.user?.status)
    )

    const status = [
        {
            status: UserStatus.Approved,
            color: 'text-primary-dark',
        },
        {
            status: UserStatus.Pending,
            color: 'text-primary',
        },
        {
            status: UserStatus.Rejected,
            color: 'text-red-600',
        },
        {
            status: UserStatus.Blocked,
            color: 'text-red-600',
        },
        {
            status: UserStatus.Archived,
            color: 'text-info-600',
        },
    ]
    return (
        <>
            {modal}
            <div className="py-3 ">
                <CustomDropdown
                    width="w-fit"
                    title="Industry Status"
                    value={insustryStatus}
                    options={options}
                    text={industry?.user?.status?.toLocaleUpperCase()}
                    textColor={
                        status?.find(
                            (s) => s?.status === industry?.user?.status
                        )?.color
                    }
                />
            </div>
        </>
    )
}
