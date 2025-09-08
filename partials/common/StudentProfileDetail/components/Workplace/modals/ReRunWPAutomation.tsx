import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'

import { FaCheckCircle } from 'react-icons/fa'

export const ReRunWPAutomation = ({
    workplace,
    onCancel,
}: {
    workplace: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [refresh, refreshResult] = SubAdminApi.Student.rerunAutomation()

    const onConfirmUClicked = async (workplace: any) => {
        const res: any = await refresh(Number(workplace.id))
        if (res?.data) {
            notification.success({
                title: `Automation Refreshed`,
                description: `Automation Refreshed.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={refreshResult} />
            <ActionModal
                Icon={FaCheckCircle}
                variant="success"
                title="Are you sure!"
                description={`You are about to rerun automation. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={workplace.id}
                actionObject={workplace}
                loading={refreshResult.isLoading}
            />
        </>
    )
}
