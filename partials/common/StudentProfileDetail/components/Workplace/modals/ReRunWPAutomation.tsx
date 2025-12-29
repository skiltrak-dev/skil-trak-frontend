import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'

import { FaCheckCircle } from 'react-icons/fa'
import { useWorkplaceHook } from '../hooks'

export const ReRunWPAutomation = ({
    workplace,
    onCancel,
}: {
    workplace: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    // const [refresh, refreshResult] = SubAdminApi.Student.rerunAutomation()

    const { setAutoApplyLoader, refresh, refreshResult } = useWorkplaceHook()

    const onConfirmUClicked = async (workplace: any) => {
        setAutoApplyLoader(true)
        refresh(Number(workplace.id))
        onCancel()
        return
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
