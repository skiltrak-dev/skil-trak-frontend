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
            onClick: () => {
                onApproveClicked()
            },
            Icon: FaEye,
        },
        {
            text: 'Archive',
            includes: [UserStatus.Approved],
            onClick: () => {
                onArchiveClicked()
            },
            status: UserStatus.Archived,
            Icon: FaEye,
        },
        {
            includes: [UserStatus.Approved],
            text: 'Block',
            onClick: () => {
                onBlockClicked()
            },
            status: UserStatus.Blocked,
            Icon: FaEye,
        },
        {
            text: 'Un Archive',
            includes: [UserStatus.Archived],
            onClick: () => {
                onUnArchiveClicked()
            },
            status: UserStatus.Blocked,
            Icon: FaEye,
        },
        {
            text: 'Un Block',
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
    return (
        <>
            {modal}
            <div className="py-3 border-b border-secondary-dark">
                <CustomDropdown
                    width="w-fit"
                    title="Industry Status"
                    value={insustryStatus}
                    options={options}
                    text={industry?.user?.status?.toLocaleUpperCase()}
                />
            </div>
        </>
    )
}
