import {
    ActionButton,
    Badge,
    Button,
    Typography,
    UserCreatedAt,
} from '@components'
import { StudentCellInfo } from '@partials/sub-admin/students'
import { ColumnDef } from '@tanstack/react-table'
import { StudentActionsRequest } from '@types'
import React, { ReactElement, useState } from 'react'
import { FaEnvelope } from 'react-icons/fa'
import { IndustryRequestRemovalStatus } from '../enum'
import {
    NoteViewModal,
    StudentApprovalActionsModal,
    StudentRejectActionsModal,
} from '../modal'

export const useStudentColumns = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancel = () => setModal(null)

    const onApproveClicked = (request: StudentActionsRequest) => {
        setModal(
            <StudentApprovalActionsModal
                request={request}
                onCancel={onCancel}
            />
        )
    }

    const onRejectClicked = (request: StudentActionsRequest) => {
        setModal(
            <StudentRejectActionsModal request={request} onCancel={onCancel} />
        )
    }

    const onViewNote = (comment: string) => {
        setModal(<NoteViewModal note={comment} onCancel={onCancel} />)
    }

    const columns: ColumnDef<StudentActionsRequest>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => (
                <StudentCellInfo student={info.row.original?.student} />
            ),
            header: () => <span>Student</span>,
        },

        {
            accessorKey: 'requestedBy',
            header: () => <span>Requested By</span>,
            cell: (info) => (
                <div>
                    <Typography variant="label">
                        {info?.row?.original?.requestedBy?.name}
                    </Typography>
                    <div className="flex items-center gap-x-1">
                        <span className="text-gray-400">
                            <FaEnvelope />
                        </span>
                        <Typography variant="small" color="text-gray-500">
                            {info?.row?.original?.requestedBy?.email}
                        </Typography>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'createdBy',
            header: () => <span>Created At</span>,
            cell: ({ row }) => (
                <UserCreatedAt createdAt={row?.original?.createdAt} />
            ),
        },
        {
            accessorKey: 'comment',
            header: () => <span>Note</span>,
            cell: ({ row }) => (
                <ActionButton
                    variant="info"
                    onClick={() => {
                        onViewNote(row?.original?.comment)
                    }}
                >
                    View
                </ActionButton>
            ),
        },
        {
            accessorKey: 'status',
            header: () => <span>Status</span>,
            cell: ({ row }) => (
                <Badge
                    text={row?.original?.status}
                    variant={
                        row.original?.status ===
                        IndustryRequestRemovalStatus.REJECTED
                            ? 'error'
                            : 'warning'
                    }
                />
            ),
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => (
                <div className="flex gap-x-1 items-center">
                    <Button
                        text={'Approve'}
                        variant="success"
                        onClick={() => onApproveClicked(info.row.original)}
                    />
                    <Button
                        text={'Reject'}
                        variant="error"
                        onClick={() => onRejectClicked(info.row.original)}
                    />
                </div>
            ),
        },
    ]

    return { columns, modal }
}
