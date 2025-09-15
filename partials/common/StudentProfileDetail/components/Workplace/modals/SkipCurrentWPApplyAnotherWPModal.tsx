import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'

import { FaTrash } from 'react-icons/fa'
import { useWorkplaceHook } from '../hooks'

export const SkipCurrentWPApplyAnotherWPModal = ({
    wpReqApproval,
    onCancel,
}: {
    wpReqApproval: any
    onCancel: () => void
}) => {
    console.log({ wpReqApproval })
    const { notification } = useNotification()

    const { setAutoApplyLoader, skipWorkplace, skipWorkplaceResult } =
        useWorkplaceHook()

    const onConfirmUClicked = async () => {
        setAutoApplyLoader(true)
        skipWorkplace({
            wpAppReqId: wpReqApproval?.id,
            wpId: wpReqApproval?.workplaceRequest?.id,
        })
        onCancel()

        // if (res?.data) {
        //     notification.warning({
        //         title: `Workplace Industry Skipped`,
        //         description: `Workplace Industry Skipped Successfully!`,
        //     })
        //     onCancel()
        // }
    }

    return (
        <>
            <ShowErrorNotifications result={skipWorkplaceResult} />
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
                loading={skipWorkplaceResult.isLoading}
            />
        </>
    )
}
