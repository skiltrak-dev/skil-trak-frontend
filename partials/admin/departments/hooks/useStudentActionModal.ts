import React, { useEffect } from 'react'
import { Student, UserStatus } from '@types'
import { useModal } from './ModalProvider'
import { FaBan, FaCheckCircle, FaTrash } from 'react-icons/fa'
import { AdminApi, CommonApi } from '@queries'
import { useNotification } from '@hooks'

// Define action types
type ActionType = 'archive' | 'accept' | 'block'

// Define action configurations
const actionConfigs = {
    archive: {
        title: 'Archive Student',
        icon: FaTrash,
        confirmText: 'Archive',
        variant: 'error',
        status: UserStatus.Archived,
        successMessage: 'Student archived successfully',
    },
    accept: {
        title: 'Accept Student',
        icon: FaCheckCircle,
        confirmText: 'Accept',
        variant: 'success',
        status: UserStatus.Approved,
        successMessage: 'Student accepted successfully',
    },
    block: {
        title: 'Block Student',
        icon: FaBan,
        confirmText: 'Block',
        variant: 'error',
        status: UserStatus.Blocked,
        successMessage: 'Student blocked successfully',
    },
}

export const useStudentActionModal = () => {
    const { openModal } = useModal()
    const [changeStatus, changeStatusResult] =
        AdminApi.Students.useChangeStatusMutation()
    const [bulkAction, resultBulkAction] =
        CommonApi.changeUserStatus.useChangeStatus()
    const { notification } = useNotification()

    const handleAction = (actionType: ActionType, student: any) => {
        const config = actionConfigs[actionType]
        openModal({
            title: config.title,
            content: `Are you sure you want to ${actionType} "${student?.user?.name}"?`,
            icon: config.icon,
            confirmText: config.confirmText,
            variant: config.variant,
            onConfirm: () => {
                changeStatus({ id: student.id, status: config.status })
            },
            loading: changeStatusResult?.isLoading,
        })
    }

    const onBlockMultiStudents = async (studentIds: number[]) => {
        return await bulkAction({ ids: studentIds, status: UserStatus.Blocked })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess && changeStatusResult.data) {
            notification.success({
                title: 'Student Status Changed',
                description: 'Student status changed successfully',
            })
        }
    }, [changeStatusResult.isSuccess, changeStatusResult.data])

    return {
        onArchiveClicked: (student: any) => handleAction('archive', student),
        onAcceptClicked: (student: any) => handleAction('accept', student),
        onClickedBlocked: (student: any) => handleAction('block', student),
        onBlockMultiStudents,
        changeStatusResult,
        resultBulkAction,
    }
}
