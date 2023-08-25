import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { Industry, UserStatus, IndustryStatus } from '@types'
import { useEffect } from 'react'
import { MdCall } from 'react-icons/md'
import { commonApi } from '@queries'
export const IsContactedModal = ({
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
            id: industry?.id,
            column: IndustryStatus?.IsContacted,
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.error({
                title: `Industry ${
                    !industry.isContacted
                        ? 'is Contacted'
                        : 'Make Not Contactable'
                }`,
                description: `Industry "${industry?.user?.name}" has been ${
                    !industry.isContacted
                        ? 'to is Contacted'
                        : 'Make Not Contactable'
                }.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for ${
                    !industry.isContacted
                        ? 'to is Contacted'
                        : 'Make Not Contactable'
                } Industry was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={MdCall}
            variant="primary"
            title="Are you sure!"
            description={`You are about to ${
                !industry?.isContacted ? 'is Contacted' : 'Make Not Contactable'
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
