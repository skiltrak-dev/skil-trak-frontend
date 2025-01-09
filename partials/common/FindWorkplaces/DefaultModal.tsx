import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry, UserStatus, IndustryStatus } from '@types'
import { useEffect } from 'react'
import { MdCall } from 'react-icons/md'
import { commonApi } from '@queries'
import { AiFillCheckCircle } from 'react-icons/ai'
export const DefaultModal = ({
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
            id: industry?.id,
            status: IndustryStatus?.DEFAULT,
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.error({
                title: `Industry is default`,
                description: `Industry "${industry?.businessName}" has been default.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for "${industry?.businessName}" Industry was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={AiFillCheckCircle}
            variant="primary"
            title="Are you sure!"
            description={`You are about to default <em>"${industry?.businessName}"</em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={industry?.email}
            actionObject={industry}
            loading={changeStatusResult.isLoading}
        />
    )
}
