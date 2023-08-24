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
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [changeStatus, changeStatusResult] =
        commonApi.useIndustriesStatusChangeMutation()

    const onConfirmClicked = async (industry: any) => {
        await changeStatus({
            id: industry.id,
            column: IndustryStatus.DoNotDisturb,
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.error({
                title: `Industry "${
                    !industry?.doNotDisturb
                        ? 'Do Not Disturb'
                        : 'Remove Do Not Disturb'
                }"`,
                description: `Industry "${industry?.user?.name}" has been "${
                    !industry?.doNotDisturb ? 'added to' : 'removed from'
                }" do not disturb.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for do not disturb Industry was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={FaBan}
            variant="error"
            title="Are you sure!"
            description={`You are about "${
                !industry?.doNotDisturb
                    ? 'to do not disturb'
                    : 'remove from do not disturb'
            }" <em>"${industry?.user?.name}"</em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={industry?.user?.email}
            actionObject={industry}
            loading={changeStatusResult.isLoading}
        />
    )
}
