import { ActionModal, ShowErrorNotifications } from '@components'
import { useAlert, useNotification } from '@hooks'
import { SubAdminApi } from '@queries'

import { Industry } from '@types'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

export const RemoveBranchModal = ({
    industry,
    onCancel,
}: {
    industry: Industry | undefined | null
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()

    const router = useRouter()

    const [remove, removeResult] =
        SubAdminApi.Industry.useRemoveIndustryBranch()

    const onConfirmUClicked = async (industry: Industry) => {
        await remove({ branch: industry?.id })
    }

    useEffect(() => {
        if (removeResult.isSuccess) {
            alert.error({
                title: `Industry Removed`,
                description: `Industry "${industry?.user?.name}" has been Removed from Branch.`,
            })
            onCancel()
        }
    }, [removeResult])

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to remove "${industry?.user?.name}" from Branch. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={industry?.user?.email}
                actionObject={industry}
                loading={removeResult.isLoading}
            />
        </>
    )
}
