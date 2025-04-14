import { ReactNode } from 'react'
import { AcceptModal } from './AcceptModal'
import { AllowAutoCompleteModal } from './AllowAutoCompleteModal'
import { AllowInvoicingModal } from './AllowInvoicingModal'
import { AllowPartialSubmissionModal } from './AllowPartialSubmissionModal'
import { AllowPermissionsModal } from './AllowPermissionsModal'
import { AllowUpdationModal } from './AllowUpdationModal'
import { ArchiveModal } from './ArchiveModal'
import { BlockModal } from './BlockModal'
import { BulkBlockModal } from './BulkBlockModal'
import { BulkUnBlockModal } from './BulkUnBlockModal'
import { DeleteModal } from './DeleteModal'
import { RejectModal } from './RejectModal'
import { ReleaseLogbookPermissionModal } from './ReleaseLogbookPermissionModal'
import { UnblockModal } from './UnblockModal'

export enum AdminRtoModalType {
    ARCHIVE = 'archive',
    BLOCK = 'block',
    BULK_BLOCK = 'bulkBlock',
    ALLOW_UPDATION = 'allowUpdation',
    ALLOW_AUTO_COMPLETE = 'allowAutoComplete',
    ALLOW_PERMISSIONS = 'allowPermissions',
    RELEASE_LOG_BOOK = 'releaseLogbook',
    ALLOW_PARTIAL_SUBMISSION = 'allowPartialSubmission',
    DELETE = 'delete',
    UNBLOCK = 'unblock',
    BULK_UNBLOCK = 'bulkUnBlock',
    ACCEPT = 'accept',
    REJECT = 'reject',
    ALLOW_INVOICING = 'allowInvoicing',
}
export const getAdminRtoModal = (
    type: AdminRtoModalType,
    rto: any,
    onCancel: () => void
): ReactNode => {
    const modals: Record<AdminRtoModalType, ReactNode> = {
        [AdminRtoModalType.ARCHIVE]: (
            <ArchiveModal item={rto} onCancel={onCancel} />
        ),
        [AdminRtoModalType.BLOCK]: <BlockModal rto={rto} onCancel={onCancel} />,
        [AdminRtoModalType.BULK_BLOCK]: (
            <BulkBlockModal rto={rto} onCancel={onCancel} />
        ),
        [AdminRtoModalType.ALLOW_UPDATION]: (
            <AllowUpdationModal rto={rto} onCancel={onCancel} />
        ),
        [AdminRtoModalType.ALLOW_AUTO_COMPLETE]: (
            <AllowAutoCompleteModal rto={rto} onCancel={onCancel} />
        ),
        [AdminRtoModalType.ALLOW_PERMISSIONS]: (
            <AllowPermissionsModal rto={rto} onCancel={onCancel} />
        ),
        [AdminRtoModalType.RELEASE_LOG_BOOK]: (
            <ReleaseLogbookPermissionModal rto={rto} onCancel={onCancel} />
        ),
        [AdminRtoModalType.ALLOW_PARTIAL_SUBMISSION]: (
            <AllowPartialSubmissionModal rto={rto} onCancel={onCancel} />
        ),
        [AdminRtoModalType.DELETE]: (
            <DeleteModal rto={rto} onCancel={onCancel} />
        ),
        [AdminRtoModalType.UNBLOCK]: (
            <UnblockModal rto={rto} onCancel={onCancel} />
        ),
        [AdminRtoModalType.BULK_UNBLOCK]: (
            <BulkUnBlockModal rto={rto} onCancel={onCancel} />
        ),
        [AdminRtoModalType.ACCEPT]: (
            <AcceptModal rto={rto} onCancel={onCancel} />
        ),
        [AdminRtoModalType.REJECT]: (
            <RejectModal rto={rto} onCancel={onCancel} />
        ),
        [AdminRtoModalType.ALLOW_INVOICING]: (
            <AllowInvoicingModal rto={rto} onCancel={onCancel} />
        ),
    }

    return modals[type]
}
