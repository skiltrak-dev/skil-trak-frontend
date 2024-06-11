import { Button } from '@components'
import { ArchiveModal, BlockModal } from '@partials/admin/sub-admin/modals'
import { SubAdmin } from '@types'
import React, { ReactElement, useState } from 'react'
import { FaArchive, FaBan } from 'react-icons/fa'

export const ProfileActions = ({ subadmin }: { subadmin: SubAdmin }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onArchivedClicked = (subAdmin: SubAdmin) => {
        setModal(
            <ArchiveModal
                item={subAdmin}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onBlockClicked = (subAdmin: SubAdmin) => {
        setModal(
            <BlockModal
                subAdmin={subAdmin}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    return (
        <>
            {modal}
            <div className="flex justify-center items-center gap-x-2">
                <Button
                    Icon={FaArchive}
                    onClick={() => onArchivedClicked(subadmin)}
                    text="Archive"
                />

                <Button
                    Icon={FaBan}
                    variant={'error'}
                    onClick={() => onBlockClicked(subadmin)}
                    text="Block"
                />
            </div>
        </>
    )
}
