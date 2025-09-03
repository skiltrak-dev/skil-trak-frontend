import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry, UserStatus, IndustryStatus } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { commonApi } from '@queries'
export const DoNotDisturbModal = ({
    industry,
    onCancel,
}: {
    industry: any | undefined | null
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [changeStatus, changeStatusResult] =
        commonApi.useIndustriesStatusChangeMutation()

    const onConfirmClicked = async (industry: any) => {
        await changeStatus({
            id: industry.id,
            status: IndustryStatus.DO_NOT_DISTURB,
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.error({
                title: `Industry is do not disturb`,
                description: `Industry "${industry?.businessName}" has been do not disturb.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for "${industry?.businessName}" do not disturb Industry was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={FaBan}
            variant="error"
            title="Are you sure!"
            description={`You are about to do not disturb <em>"${industry?.businessName}"</em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={industry?.email}
            actionObject={industry}
            loading={changeStatusResult.isLoading}
        />
    )
}
