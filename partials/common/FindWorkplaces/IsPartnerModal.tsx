import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry, UserStatus, IndustryStatus } from '@types'
import { useEffect } from 'react'
import { FaHandshake } from 'react-icons/fa'
import { commonApi } from '@queries'
export const IsPartnerModal = ({
    industry,
    onCancel,
}: {
    industry: Industry | undefined | null
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [changeStatus, changeStatusResult] =
        commonApi.useIndustriesStatusChangeMutation()

    const onConfirmClicked = async (industry: Industry) => {
        await changeStatus({
            id: industry.id,
            column: IndustryStatus.IsPartner,
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.error({
                title: `Industry is Partner`,
                description: `Industry "${industry?.user?.name}" has been ${
                    !industry?.isPartner ? 'added to is Partner' : 'Remove Partner'
                }.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for ${
                    !industry?.isPartner ? 'is Partner' : 'Remove Partner'
                } Industry was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={FaHandshake}
            variant="primary"
            title="Are you sure!"
            description={`You are about to ${
                !industry?.isPartner ? 'is Partner' : 'Remove Partner'
            } <em>"${industry?.user?.name}"</em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={industry?.user?.email}
            actionObject={industry}
            loading={changeStatusResult.isLoading}
        />
    )
}
