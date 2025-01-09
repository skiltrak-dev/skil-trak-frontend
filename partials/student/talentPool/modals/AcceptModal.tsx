import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Industry, SubAdmin, Subscriber } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { HiCheckBadge } from 'react-icons/hi2'
import { StudentApi } from '@queries'

export const AcceptModal = ({
    industry,
    onCancel,
}: {
    industry: any
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [onChangeStatus, changeStatusResult] =
        StudentApi.TalentPool.useIndustryRequestStatus()

    const onConfirmUClicked = async (industry: any) => {
        const status = 'connected'
        const id = industry.request_id
        await onChangeStatus({ status: status, conId: id })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.success({
                title: `Request Accepted`,
                description: `Industry "${industry?.name}" has been accepted.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for accepting Industry was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={HiCheckBadge}
            variant="success"
            title="Are you sure!"
            description={`You are about to accept <em>"${industry?.name}"<em>. Do you wish to continue?`}
            onConfirm={onConfirmUClicked}
            onCancel={onCancel}
            input
            inputKey={industry?.email}
            actionObject={industry}
            loading={changeStatusResult.isLoading}
        />
    )
}
