import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { StudentApi } from '@queries'

export const CancelModal = ({
    industry,
    onCancel,
}: {
    industry: any
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [onChangeStatus, changeStatusResult] =
        StudentApi.TalentPool.useIndustryRequestStatus()

    const onConfirmClicked = async (industry: any) => {
        const status = 'rejected'
        const id = industry.request_id
        await onChangeStatus({ body: status, conId: id })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.error({
                title: `Industry Reject`,
                description: `Industry "${industry?.name}" has been rejected.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for rejecting Industry was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={FaBan}
            variant="error"
            title="Are you sure!"
            description={`You are about to reject <em>"${industry?.name}"</em>. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={industry?.email}
            actionObject={industry}
            loading={changeStatusResult.isLoading}
        />
    )
}
