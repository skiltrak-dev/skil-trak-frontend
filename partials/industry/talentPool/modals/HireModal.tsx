import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Industry, SubAdmin, Subscriber } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { HiCheckBadge } from 'react-icons/hi2'
import { StudentApi } from '@queries'

export const HireModal = ({
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

    const onConfirmUClicked = async (industry: any) => {
        const status = 'hired'
        const id = industry?.connectionRequests?.[0]?.id
        await onChangeStatus({ status: status, conId: id })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.success({
                title: `Student Hired...!`,
                description: `Student "${industry?.student?.user?.name}" has been hired.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for hiring student was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={HiCheckBadge}
            variant="success"
            title="Are you sure!"
            description={`You are about to hire <em>"${industry?.student?.user?.name}"<em>. Do you wish to continue?`}
            onConfirm={onConfirmUClicked}
            onCancel={onCancel}
            input
            inputKey={industry?.student?.user?.email}
            actionObject={industry}
            loading={changeStatusResult.isLoading}
        />
    )
}
