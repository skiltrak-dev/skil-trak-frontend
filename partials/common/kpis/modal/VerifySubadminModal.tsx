import { SubAdmin } from '@types'
import { SubAdminApi } from '@queries'
import { useRouter } from 'next/router'
import { useNotification } from '@hooks'
import { FaTrash } from 'react-icons/fa'
import { ActionModal, ShowErrorNotifications } from '@components'

export const VerifySubadminModal = ({
    subAdmin,
    onCancel,
}: {
    subAdmin: any
    onCancel: () => void
}) => {
    const router = useRouter()

    const { notification } = useNotification()

    const [verify, verifyResult] = SubAdminApi.Kpi.verifyDeptSubadmin()

    const onConfirmUClicked = async () => {
        const res: any = await verify(Number(router?.query?.id))

        if (res?.data) {
            notification.success({
                title: 'Employee Verified',
                description: 'Employee has been verified successfully',
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={verifyResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to verify "${subAdmin?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={subAdmin?.email}
                actionObject={subAdmin}
                loading={verifyResult.isLoading}
            />
        </>
    )
}
