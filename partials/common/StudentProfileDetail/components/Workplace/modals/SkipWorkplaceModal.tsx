import { ActionModal, ShowErrorNotifications } from '@components'

import { FaTrash } from 'react-icons/fa'
import { useWorkplaceHook } from '../hooks'

export const SkipWorkplaceModal = ({
    wpReqApproval,
    onCancel,
}: {
    wpReqApproval: any
    onCancel: () => void
}) => {
    const { setAutoApplyLoader, skipWP, skipWpResult } = useWorkplaceHook()

    const onConfirmUClicked = () => {
        setAutoApplyLoader(true)
        skipWP(wpReqApproval?.workplaceRequest?.id)
        onCancel()
    }

    return (
        <>
            <ShowErrorNotifications result={skipWpResult} />
            <ActionModal
                Icon={FaTrash}
                variant="error"
                title="Are you sure!"
                description={`You are about to skip workplace. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={String(wpReqApproval?.id)}
                actionObject={wpReqApproval}
                loading={skipWpResult.isLoading}
            />
        </>
    )
}
