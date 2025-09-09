import { UserRoles } from '@constants'
import { useCheckPermission } from '@partials/admin/hooks'
import { Rto, UserStatus } from '@types'
import { getUserCredentials } from '@utils'
import { FaFileInvoiceDollar, FaSchool } from 'react-icons/fa'
import { usePermission } from './usePermission'
import { useChangeStatus } from './useChangeStatus'
import { useModal } from '@hooks'
import { AdminRtoModalType, getAdminRtoModal } from '../modals'
import { MdIncompleteCircle, MdOutlinePayment } from 'react-icons/md'

export const usePermissionData = (rto: Rto) => {
    const { Actions, results } = usePermission()

    const { modal, openModal, closeModal } = useModal()

    const { onArchive, onBlock, changeStatusResult } = useChangeStatus()

    const handleOpenModal = (type: AdminRtoModalType, rto: Rto) => {
        openModal(getAdminRtoModal(type, rto, closeModal))
    }

    const role = getUserCredentials()?.role

    const {
        isAdmin,
        isHod,
        subAdminRole,
        permissions: truePermissions,
    } = useCheckPermission()

    const allPermissions = [
        {
            text: 'Allow Logbook',
            onClick: () => Actions?.onAllowLogbookClicked(rto),
            toggle: rto?.autoReleaseLogBook,
            isLoading: results?.releaseLogbookResult.isLoading,
            Icon: FaSchool,
        },
        {
            text: 'Allow Update',
            onClick: () => Actions?.onAllowUpdateClicked(rto),
            toggle: rto?.allowUpdate,
            isLoading: results?.allowUpdationResult.isLoading,
            Icon: FaSchool,
        },
        {
            text: 'Allow Auto Complete',
            onClick: () => Actions?.onAllowAutoCompleteClicked(rto),
            toggle: rto?.allowAutoComplete,
            isLoading: results?.allowAutoUpdateResult.isLoading,
            Icon: FaSchool,
        },
        {
            text: 'Allow Workplace Request Approval',
            onClick: () => Actions?.onAllWpRequest(rto),
            toggle: rto?.workplaceApprovalRequired,
            isLoading: results?.rtoWpApprovalRequestResult.isLoading,
            Icon: FaSchool,
        },
        {
            text: 'Allow Partial Submission',
            onClick: () =>
                Actions?.onAllowPermissionClicked(
                    rto,
                    !rto?.allowPartialSubmission
                ),
            toggle: rto?.allowPartialSubmission,
            isLoading: results?.allowPermissionsResult.isLoading,
            Icon: FaSchool,
        },
        {
            text: 'Can View Payment Status',
            onClick: () => Actions?.onAllowCanViewPayment(rto),
            toggle: rto?.canViewPaymentStatus,
            isLoading: results?.rtoCanViewPaymentResult.isLoading,
            Icon: MdOutlinePayment,
        },
        {
            text: 'Allow Schedule Email',
            onClick: () => Actions?.onAllowScheduleEmail(rto),
            toggle: rto?.allowScheduleEmails,
            isLoading: results?.allowScheduleEmailResult.isLoading,
            Icon: MdOutlinePayment,
        },
        {
            text: 'Archive',
            onClick: async () => {
                return await onArchive(rto)
            },
            toggle: rto?.user?.status === UserStatus.Archived,
            isLoading: changeStatusResult.isLoading,
            Icon: FaSchool,
        },
        {
            text: 'Block',
            onClick: async () => {
                return await onBlock(rto)
            },
            toggle: rto?.user?.status === UserStatus.Blocked,
            isLoading: changeStatusResult.isLoading,
            Icon: FaSchool,
        },
        {
            text: 'Invoice Permission',
            onClick: () =>
                handleOpenModal(AdminRtoModalType.ALLOW_INVOICING, rto),
            Icon: FaFileInvoiceDollar,
            isButton: true,
        },
        {
            text: 'Auto Report Permissions',
            onClick: () =>
                handleOpenModal(AdminRtoModalType.ALLOW_PERMISSIONS, rto),
            Icon: MdIncompleteCircle,
            isButton: true,
        },
        {
            text: 'Self Payment',
            onClick: () =>
                handleOpenModal(AdminRtoModalType.ALLOW_SELF_PAYMENT, rto),
            Icon: MdIncompleteCircle,
            toggle: rto?.allowStudentSelfPayment,
        },
    ]

    // const responses = Object.values(results)

    // return { permissions, responses }
    const filteredPermissions = allPermissions.filter((permission: any) => {
        if (role === UserRoles.ADMIN) {
            return true
        }
        if (subAdminRole && isAdmin && isHod) {
            // Check if the key exists in truePermissions and its value is true
            return (
                Object.prototype.hasOwnProperty.call(
                    truePermissions,
                    permission.key
                ) && truePermissions[permission.key] === true
            )
        }
        return false
    })

    const responses = Object.values(results)

    return { permissions: filteredPermissions, responses, modal }
}
