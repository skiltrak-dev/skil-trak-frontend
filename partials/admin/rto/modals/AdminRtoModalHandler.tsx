import { ReactNode } from 'react'
import { ArchiveModal } from './ArchiveModal'
import { BlockModal } from './BlockModal'
import { BulkBlockModal } from './BulkBlockModal'
import { AllowUpdationModal } from './AllowUpdationModal'
import { AllowAutoCompleteModal } from './AllowAutoCompleteModal'
import { AllowPermissionsModal } from './AllowPermissionsModal'
import { ReleaseLogbookPermissionModal } from './ReleaseLogbookPermissionModal'
import { Rto } from '@types'
import { AllowPartialSubmissionModal } from './AllowPartialSubmissionModal'
import { DeleteModal } from './DeleteModal'
import { UnblockModal } from './UnblockModal'
import { BulkUnBlockModal } from './BulkUnBlockModal'
import { AcceptModal } from './AcceptModal'
import { RejectModal } from './RejectModal'

export const getAdminRtoModal = (
    type: string,
    rto: any,
    onCancel: () => void
): ReactNode => {
    const modals: Record<string, ReactNode> = {
        archive: <ArchiveModal item={rto} onCancel={onCancel} />,
        block: <BlockModal rto={rto} onCancel={onCancel} />,
        bulkBlock: <BulkBlockModal rto={rto} onCancel={onCancel} />,
        allowUpdation: <AllowUpdationModal rto={rto} onCancel={onCancel} />,
        allowAutoComplete: (
            <AllowAutoCompleteModal rto={rto} onCancel={onCancel} />
        ),
        allowPermissions: (
            <AllowPermissionsModal rto={rto} onCancel={onCancel} />
        ),
        releaseLogbook: (
            <ReleaseLogbookPermissionModal rto={rto} onCancel={onCancel} />
        ),
        allowPartialSubmission: (
            <AllowPartialSubmissionModal rto={rto} onCancel={onCancel} />
        ),
        // Archive tabs modal
        delete: <DeleteModal rto={rto} onCancel={onCancel} />,

        // Block tabs Modal
        unblock: <UnblockModal rto={rto} onCancel={onCancel} />,
        bulkUnBlock: <BulkUnBlockModal rto={rto} onCancel={onCancel} />,
        
        // Pending tabs Modal
        accept: <AcceptModal rto={rto} onCancel={onCancel} />,
        reject: <RejectModal rto={rto} onCancel={onCancel} />,
    }

    return modals[type]
}
