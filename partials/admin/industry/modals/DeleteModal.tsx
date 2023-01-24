import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { Industry } from '@types'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const DeleteModal = ({
    industry,
    onCancel,
}: {
    industry: Industry | undefined | null
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()

    const router = useRouter()

    const [remove, removeResult] = AdminApi.Industries.useRemove()

    const onConfirmUClicked = async (industry: Industry) => {
        await remove(industry.id)
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            alert.error({
                title: `Industry Deleted`,
                description: `Industry "${industry?.user?.name}" has been deleted.`,
            })
            onCancel()
            router.push('/portals/admin/industry?tab=approved')
        }
        if (removeResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for deleting Industry was failed`,
            })
        }
    }, [removeResult])

    return (
        <ActionModal
            Icon={FaTrash}
            variant="error"
            title="Are you sure!"
            description={`You are about to delete "${industry?.user?.name}". Do you wish to continue?`}
            onConfirm={onConfirmUClicked}
            onCancel={onCancel}
            input
            inputKey={industry?.user?.email}
            actionObject={industry}
            loading={removeResult.isLoading}
        />
    )
}
