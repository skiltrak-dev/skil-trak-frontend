import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { Industry, IndustryStatus } from '@types'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { HiCheckBadge } from 'react-icons/hi2'

export const AcceptModal = ({
    industry,
    onCancel,
}: {
    industry: any
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const router = useRouter()

    const [changeStatus, changeStatusResult] =
        CommonApi.FindWorkplace.useChangePendingIndustryStatus()

    const onConfirmClicked = async (industry: Industry) => {
        await changeStatus({
            params: {
                id: industry?.id,
                status: 'approved',
            },
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            notification.success({
                title: `Industry Accept`,
                description: `Industry "${industry?.industry?.user?.name}" has been accept.`,
            })
            router.push('/portals/sub-admin/department/course-request')
            onCancel()
        }
    }, [changeStatusResult])

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant="success"
                title="Are you sure!"
                description={`You are about to accept <em>"${industry?.industry?.user?.name}"</em>. Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={industry?.industry?.user?.email}
                actionObject={industry}
                loading={changeStatusResult.isLoading}
            />
        </>
    )
}
