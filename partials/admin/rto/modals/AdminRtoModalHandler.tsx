import { ReactNode } from 'react'
import { ArchiveModal } from './ArchiveModal'
import { BlockModal } from './BlockModal'
import { BulkBlockModal } from './BulkBlockModal'
import { AllowUpdationModal } from './AllowUpdationModal'
import { AllowAutoCompleteModal } from './AllowAutoCompleteModal'
import { AllowPermissionsModal } from './AllowPermissionsModal'
import { ReleaseLogbookPermissionModal } from './ReleaseLogbookPermissionModal'
import { Rto } from '@types'

export const getAdminRtoModal = (
    type: string,
    rto: Rto,
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
    }

    return modals[type]
}
