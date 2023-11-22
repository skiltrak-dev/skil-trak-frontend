import { Modal } from '@components'
import { getLink } from '@utils'
import { useRouter } from 'next/router'
import React from 'react'
import { CiStickyNote } from 'react-icons/ci'

export const AddNoteNotificationModal = ({
    onCancel,
}: {
    onCancel: () => void
}) => {
    const router = useRouter()

    // Combine the pathname with the dynamic segments

    return (
        <Modal
            title="Add Note"
            subtitle="Are you sure"
            onCancelClick={() => {
                onCancel()
                router.push({
                    pathname: router.asPath?.split('?')?.[0],
                    query: { tab: 'notes' },
                })
            }}
            titleIcon={CiStickyNote}
            onConfirmClick={() =>
                router.push(
                    `/${getLink('subadmin-student')}` ||
                        '/portals/sub-admin/students?tab=all'
                )
            }
        >
            Are you sure, you have added the notification and you want to leave
            this page?
        </Modal>
    )
}
