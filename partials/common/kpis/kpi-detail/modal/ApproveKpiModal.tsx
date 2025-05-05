import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'

import { FaTrash } from 'react-icons/fa'

export const ApproveKpiModal = ({
    kpi,
    onCancel,
}: {
    kpi: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [verify, verifyResult] = SubAdminApi.Kpi.verifyDeptSubadmin()

    const onConfirmUClicked = async (kpi: any) => {
        const res: any = await verify(Number(kpi.id))
        if (res?.data) {
            notification.error({
                title: `Kpi Verified`,
                description: `Kpi has been Verified.`,
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
                description={`You are about to Verify. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={''}
                actionObject={kpi}
                loading={verifyResult.isLoading}
            />
        </>
    )
}
