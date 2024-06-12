import { Button } from '@components'
import {
    ArchiveModal,
    BlockModal,
    RejectModal,
    UnblockModal,
    DeleteModal,
    AcceptModal,
    UnArchiveModal,
} from '@partials/admin/sub-admin/modals'
import { SubAdmin, UserStatus } from '@types'
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
    const onRejectClicked = (subAdmin: SubAdmin) => {
        setModal(
            <RejectModal
                subAdmin={subAdmin}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onUnBlockedClicked = (subAdmin: SubAdmin) => {
        setModal(
            <UnblockModal
                subAdmin={subAdmin}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onAcceptClicked = (subAdmin: SubAdmin) => {
        setModal(
            <AcceptModal
                subAdmin={subAdmin}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onUnArchivedClicked = (subAdmin: SubAdmin) => {
        setModal(
            <UnArchiveModal
                subadmin={subAdmin}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onDeleteClicked = (subAdmin: SubAdmin) => {
        setModal(
            <DeleteModal
                subAdmin={subAdmin}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const statusBaseActions = () => {
        switch (subadmin?.user?.status) {
            case UserStatus.Approved:
                return (
                    <>
                        <Button
                            Icon={FaArchive}
                            onClick={() => onArchivedClicked(subadmin)}
                            text="Archive"
                        />

                        <Button
                            text="Reject"
                            variant="error"
                            Icon={FaArchive}
                            onClick={() => onRejectClicked(subadmin)}
                        />

                        <Button
                            Icon={FaBan}
                            variant={'error'}
                            onClick={() => onBlockClicked(subadmin)}
                            text="Block"
                        />
                    </>
                )
            case UserStatus.Blocked:
                return (
                    <>
                        <Button
                            Icon={FaArchive}
                            onClick={() => onUnBlockedClicked(subadmin)}
                            text="Un Block"
                            variant={'error'}
                        />

                        <Button
                            Icon={FaArchive}
                            onClick={() => onDeleteClicked(subadmin)}
                            text="Delete"
                            variant={'error'}
                        />
                    </>
                )
            case UserStatus.Rejected:
                return (
                    <>
                        <Button
                            Icon={FaArchive}
                            onClick={() => onAcceptClicked(subadmin)}
                            text="Accept"
                        />

                        <Button
                            Icon={FaArchive}
                            onClick={() => onDeleteClicked(subadmin)}
                            text="Delete"
                            variant={'error'}
                        />
                    </>
                )
            case UserStatus.Archived:
                return (
                    <>
                        <Button
                            Icon={FaBan}
                            onClick={() => onUnArchivedClicked(subadmin)}
                            text="Un Archive"
                        />
                        <Button
                            Icon={FaArchive}
                            onClick={() => onDeleteClicked(subadmin)}
                            text="Delete"
                            variant={'error'}
                        />
                    </>
                )

            default:
                return
        }
    }
    return (
        <>
            {modal}
            <div className="flex justify-center items-center gap-x-2">
                {statusBaseActions()}
            </div>
        </>
    )
}
