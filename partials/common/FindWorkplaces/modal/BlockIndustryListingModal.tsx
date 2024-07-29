import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { Industry, IndustryStatus } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'

export const BlockIndustryListingModal = ({
    industry,
    onCancel,
}: {
    industry: any
    onCancel: Function
}) => {
    const { notification } = useNotification()

    const [changeStatus, changeStatusResult] =
        CommonApi.FindWorkplace.useIndustriesStatusChange()

    const onConfirmClicked = async (industry: Industry) => {
        await changeStatus({
            id: industry?.id,
            status: IndustryStatus.BLOCKED,
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            notification.error({
                title: `Industry Blocked`,
                description: `Industry "${industry?.businessName}" has been blocked.`,
            })
            onCancel()
        }
    }, [changeStatusResult])

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                Icon={FaBan}
                variant="error"
                title="Are you sure!"
                description={`You are about to block <em>"${industry?.businessName}"</em>. Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={industry?.email}
                actionObject={industry}
                loading={changeStatusResult.isLoading}
            />
        </>
    )
}
